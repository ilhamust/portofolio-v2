import { supabase, isSupabaseConfigured } from '@/lib/supabase.js'

const CACHE_KEY = 'portfolio_guestbook_messages'
const QUEUE_KEY = 'portfolio_guestbook_queue'

// Helper to normalize message structure
export const normalizeMessage = (item) => {
  const timestamp = item.created_at || item.createdAt || new Date().toISOString()
  return {
    id: item.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `local-${Date.now()}`),
    name: item.name || 'Anonymous',
    email: item.email || null,
    message: item.message || '',
    createdAt: timestamp,
    created_at: timestamp,
    isPendingSync: Boolean(item.isPendingSync)
  }
}

// -------------------------------------------------------------
// LOCAL CACHE HELPERS
// -------------------------------------------------------------
export const getCachedGuestbookMessages = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // Filter out any legacy dummy seeds (gb-1 .. gb-5)
    const cleaned = parsed.filter(item => !['gb-1', 'gb-2', 'gb-3', 'gb-4', 'gb-5'].includes(item.id))
    return cleaned.map(normalizeMessage)
  } catch (err) {
    console.warn('[Guestbook Cache] Failed to read cache:', err)
    return []
  }
}

export const setCachedGuestbookMessages = (messages) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(messages))
  } catch (err) {
    console.warn('[Guestbook Cache] Failed to write cache:', err)
  }
}

// Backward compatibility helper
export const getStoredGuestbookMessages = () => {
  return getCachedGuestbookMessages()
}

// -------------------------------------------------------------
// OFFLINE SYNC QUEUE HELPERS
// -------------------------------------------------------------
export const getPendingQueue = () => {
  try {
    const raw = localStorage.getItem(QUEUE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.warn('[Guestbook Queue] Failed to read queue:', err)
    return []
  }
}

export const addToPendingQueue = (entry) => {
  try {
    const queue = getPendingQueue()
    queue.push(entry)
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue))
  } catch (err) {
    console.warn('[Guestbook Queue] Failed to add to queue:', err)
  }
}

export const clearPendingQueue = () => {
  try {
    localStorage.removeItem(QUEUE_KEY)
  } catch (err) {
    console.warn('[Guestbook Queue] Failed to clear queue:', err)
  }
}

// -------------------------------------------------------------
// FETCH MESSAGES (SUPABASE WITH CACHE FALLBACK)
// -------------------------------------------------------------
export const fetchGuestbookMessages = async () => {
  // Check if online and supabase is configured
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true

  if (isSupabaseConfigured && isOnline) {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('id, name, message, created_at')
        .order('created_at', { ascending: false })

      if (error) throw error

      if (Array.isArray(data)) {
        const normalizedRemote = data.map(normalizeMessage)
        
        // Merge with any unsynced local pending queue items (show them at top)
        const pendingQueue = getPendingQueue()
        const pendingMapped = pendingQueue.map(item => ({
          ...normalizeMessage(item),
          isPendingSync: true
        }))

        // Prevent duplicate IDs if remote already has it
        const remoteIds = new Set(normalizedRemote.map(m => m.id))
        const unconfirmedPending = pendingMapped.filter(m => !remoteIds.has(m.id))

        const combined = [...unconfirmedPending, ...normalizedRemote]
        setCachedGuestbookMessages(combined)
        return combined
      }
    } catch (err) {
      console.warn('[Guestbook] Failed to fetch from Supabase, using local cache:', err)
    }
  }

  // Fallback to local storage cache if offline or fetch failed
  return getCachedGuestbookMessages()
}

// -------------------------------------------------------------
// SAVE MESSAGE (OPTIMISTIC + SUPABASE + OFFLINE QUEUE)
// -------------------------------------------------------------
export const saveGuestbookMessage = async (entry) => {
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true
  const localId = typeof crypto !== 'undefined' && crypto.randomUUID 
    ? crypto.randomUUID() 
    : `local-${Date.now()}`

  const payload = {
    id: entry.id || localId,
    name: entry.name,
    email: entry.email || null,
    message: entry.message,
    created_at: entry.createdAt || new Date().toISOString()
  }

  // If online and Supabase is configured, attempt direct insert
  if (isSupabaseConfigured && isOnline) {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([{
          name: payload.name,
          email: payload.email,
          message: payload.message
        }])
        .select('id, name, message, created_at')

      if (error) throw error

      const inserted = data && data.length > 0 ? normalizeMessage(data[0]) : normalizeMessage(payload)

      // Update local cache
      const cached = getCachedGuestbookMessages()
      const updated = [inserted, ...cached.filter(item => item.id !== payload.id)]
      setCachedGuestbookMessages(updated)

      return {
        success: true,
        queued: false,
        entry: inserted,
        messages: updated
      }
    } catch (err) {
      console.warn('[Guestbook] Direct insert failed, queueing offline:', err)
    }
  }

  // Fallback: Queue locally if offline or Supabase insert failed
  const pendingEntry = {
    ...normalizeMessage(payload),
    isPendingSync: true
  }

  addToPendingQueue(payload)

  const cached = getCachedGuestbookMessages()
  const updated = [pendingEntry, ...cached]
  setCachedGuestbookMessages(updated)

  return {
    success: true,
    queued: true,
    entry: pendingEntry,
    messages: updated
  }
}

// -------------------------------------------------------------
// SYNC PENDING MESSAGES (FLUSH QUEUE TO SUPABASE)
// -------------------------------------------------------------
export const syncPendingMessages = async () => {
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true
  if (!isSupabaseConfigured || !isOnline) {
    return { synced: 0, pending: getPendingQueue().length }
  }

  const queue = getPendingQueue()
  if (queue.length === 0) {
    return { synced: 0, pending: 0 }
  }

  try {
    const itemsToInsert = queue.map(item => ({
      name: item.name,
      email: item.email || null,
      message: item.message
    }))

    const { error } = await supabase
      .from('contacts')
      .insert(itemsToInsert)

    if (error) throw error

    // Successfully sent all queued items
    clearPendingQueue()

    // Refresh data from Supabase to update local cache
    const freshMessages = await fetchGuestbookMessages()

    return {
      synced: queue.length,
      pending: 0,
      messages: freshMessages
    }
  } catch (err) {
    console.warn('[Guestbook Sync] Failed to sync pending messages:', err)
    return {
      synced: 0,
      pending: queue.length,
      error: err
    }
  }
}
