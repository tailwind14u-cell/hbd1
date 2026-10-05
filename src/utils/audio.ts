// Web Audio API Synthesizer for Birthday Melodies & Playful Cat/Art Sounds
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isPlayingTune: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlayingTune(): boolean {
    return this.isPlayingTune;
  }

  // Play a soft pleasant music box chime note
  public playNote(frequency: number, duration: number = 0.5, type: OscillatorType = 'sine', volume: number = 0.15) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Play cheerful confetti pop
  public playPop() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Audio error catch
    }
  }

  // Play blow out candle whoosh
  public playBlow() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      // Filtered noise simulating a breath
      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.35);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // Audio error catch
    }
  }

  // Play cute synthetic cat purr/meow
  public playMeow() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      // Meow pitch curve: starts medium, swoops up, fades down
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.45);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch {
      // Audio error catch
    }
  }

  // Play cozy purr rumble
  public playPurr() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(32, now); // low frequency vibration
      osc.frequency.linearRampToValueAtTime(38, now + 0.3);
      osc.frequency.linearRampToValueAtTime(30, now + 0.6);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch {
      // Audio error catch
    }
  }

  // Play "Happy Birthday" melody (music box bell arrangement)
  public playBirthdayMelody(onComplete?: () => void) {
    if (this.isPlayingTune) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      this.isPlayingTune = true;

      // Happy Birthday in C Major notes and timings
      // C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88, C5=523.25
      const notes: { freq: number; dur: number; delay: number }[] = [
        { freq: 261.63, dur: 0.28, delay: 0.0 },   // Hap-
        { freq: 261.63, dur: 0.28, delay: 0.35 },  // py
        { freq: 293.66, dur: 0.5, delay: 0.7 },    // Birth-
        { freq: 261.63, dur: 0.5, delay: 1.3 },    // day
        { freq: 349.23, dur: 0.5, delay: 1.9 },    // to
        { freq: 329.63, dur: 0.9, delay: 2.5 },    // you

        { freq: 261.63, dur: 0.28, delay: 3.6 },   // Hap-
        { freq: 261.63, dur: 0.28, delay: 3.95 },  // py
        { freq: 293.66, dur: 0.5, delay: 4.3 },    // Birth-
        { freq: 261.63, dur: 0.5, delay: 4.9 },    // day
        { freq: 392.00, dur: 0.5, delay: 5.5 },    // to
        { freq: 349.23, dur: 0.9, delay: 6.1 },    // you

        { freq: 261.63, dur: 0.28, delay: 7.2 },   // Hap-
        { freq: 261.63, dur: 0.28, delay: 7.55 },  // py
        { freq: 523.25, dur: 0.5, delay: 7.9 },    // Birth-
        { freq: 440.00, dur: 0.5, delay: 8.5 },    // day
        { freq: 349.23, dur: 0.45, delay: 9.1 },   // dear
        { freq: 329.63, dur: 0.45, delay: 9.6 },   // R-
        { freq: 293.66, dur: 0.8, delay: 10.1 },   // B!

        { freq: 466.16, dur: 0.28, delay: 11.2 },  // Hap-
        { freq: 466.16, dur: 0.28, delay: 11.55 }, // py
        { freq: 440.00, dur: 0.5, delay: 11.9 },   // Birth-
        { freq: 349.23, dur: 0.5, delay: 12.5 },   // day
        { freq: 392.00, dur: 0.5, delay: 13.1 },   // to
        { freq: 349.23, dur: 1.1, delay: 13.7 },   // you!
      ];

      notes.forEach((n) => {
        setTimeout(() => {
          if (!this.isMuted) {
            this.playNote(n.freq, n.dur, 'sine', 0.22);
            // Harmonic chime overtone
            this.playNote(n.freq * 2, n.dur * 0.6, 'sine', 0.08);
          }
        }, n.delay * 1000);
      });

      const totalDuration = (13.7 + 1.2) * 1000;
      setTimeout(() => {
        this.isPlayingTune = false;
        if (onComplete) onComplete();
      }, totalDuration);
    } catch {
      this.isPlayingTune = false;
      if (onComplete) onComplete();
    }
  }
}

export const soundEngine = new SoundEngine();
