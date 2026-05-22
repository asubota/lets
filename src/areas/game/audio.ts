let ctx: AudioContext | null = null

export const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') {
    return null
  }
  if (ctx === null) {
    try {
      ctx = new AudioContext()
    } catch {
      return null
    }
  }
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => undefined)
  }
  return ctx
}

const detectIosSafari = (): boolean => {
  if (typeof navigator === 'undefined' || typeof document === 'undefined') {
    return false
  }
  const ua = navigator.userAgent
  return /iPad|iPhone|iPod/.test(ua) || (ua.includes('Mac') && 'ontouchend' in document)
}

const detectNativeVibrate = (): boolean => {
  if (typeof navigator === 'undefined') {
    return false
  }
  if (!('vibrate' in navigator) || typeof navigator.vibrate !== 'function') {
    return false
  }
  // iOS Safari exposes navigator.vibrate via some shim but it's a no-op
  if (detectIosSafari()) {
    return false
  }
  return true
}

// Cached once at module load — environment doesn't change during runtime.
const NATIVE_VIBRATE = detectNativeVibrate()

export const hasNativeVibrate = (): boolean => NATIVE_VIBRATE
