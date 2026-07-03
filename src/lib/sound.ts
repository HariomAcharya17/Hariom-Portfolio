// Web Audio API Sound Utility for Professional UI Interactions
// Synthesizes pleasant sounds dynamically without external assets.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playUISound(type: "click" | "toggle") {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "click") {
      // Solid organic tick sound: high frequency short transient
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);

      // Extremely fast exponential decay for a solid "tick"
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

      osc.start(now);
      osc.stop(now + 0.03);
    } else if (type === "toggle") {
      // Click-clack switch "tickle" sound: two quick successive ticks
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

      osc.start(now);
      osc.stop(now + 0.03);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(600, now + 0.04);
      gain2.gain.setValueAtTime(0.08, now + 0.04);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.04);
      osc2.stop(now + 0.07);
    }
  } catch (error) {
    // Fail silently to avoid interrupting user flows if AudioContext is blocked
    console.warn("Failed to play UI sound:", error);
  }
}
