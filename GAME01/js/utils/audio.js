// Placeholder audio module using Web Audio API
// Simple beep sounds for UI feedback

let audioCtx = null;

function getContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

export function playBeep(frequency = 440, duration = 0.1, volume = 0.1) {
  try {
    const ctx = getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'square';
    gainNode.gain.value = volume;

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    // Audio not supported, silently ignore
  }
}

export function playSelect() {
  playBeep(600, 0.08, 0.08);
}

export function playConfirm() {
  playBeep(800, 0.1, 0.08);
}

export function playCancel() {
  playBeep(300, 0.15, 0.08);
}
