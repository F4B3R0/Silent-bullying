/**
 * Web Audio API synthesizer for 'Berani Bicara'
 * Pure client-side synthesis: zero external audio files needed, guaranteed reliability.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isBgmPlaying = false;
  private bgmInterval: number | null = null;

  public musicEnabled = true;
  public sfxEnabled = true;
  public volume = 0.7;

  constructor() {
    // AudioContext will be initialized on first user interaction
    const savedMusic = localStorage.getItem('bb_music_enabled');
    const savedSfx = localStorage.getItem('bb_sfx_enabled');
    if (savedMusic !== null) this.musicEnabled = savedMusic === 'true';
    if (savedSfx !== null) this.sfxEnabled = savedSfx === 'true';
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.value = this.musicEnabled ? this.volume * 0.25 : 0;
      this.bgmGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = this.sfxEnabled ? this.volume * 0.5 : 0;
      this.sfxGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    localStorage.setItem('bb_music_enabled', String(enabled));
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setTargetAtTime(enabled ? this.volume * 0.25 : 0, this.ctx.currentTime, 0.05);
    }
    if (enabled && !this.isBgmPlaying) {
      this.startBgm();
    } else if (!enabled && this.isBgmPlaying) {
      this.stopBgm();
    }
  }

  public setSfxEnabled(enabled: boolean) {
    this.sfxEnabled = enabled;
    localStorage.setItem('bb_sfx_enabled', String(enabled));
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setTargetAtTime(enabled ? this.volume * 0.5 : 0, this.ctx.currentTime, 0.05);
    }
  }

  /**
   * Sound effect: Button Tap
   */
  public playClick() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio context might fail on restricted browser state
    }
  }

  /**
   * Sound effect: Score Gain (Empathy & Trust Sparkle)
   */
  public playScoreGain() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;
      // 3 ascending notes: C5, E5, G5 (523Hz, 659Hz, 784Hz)
      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.35, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.36);
      });
    } catch {
      // Silent fail
    }
  }

  /**
   * Sound effect: Scene transition / whoosh
   */
  public playTransition() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.25);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // Silent fail
    }
  }

  /**
   * Sound effect: Chat notification
   */
  public playNotification() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;
      const freqs = [880, 1318.5]; // A5 and E6
      freqs.forEach((f, i) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.09);

        gain.gain.setValueAtTime(0.25, now + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.09 + 0.15);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.16);
      });
    } catch {
      // Silent fail
    }
  }

  /**
   * Sound effect: Counseling bell tone
   */
  public playCounselingBell() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now); // A4 singing bowl
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 1.25);
    } catch {
      // Silent fail
    }
  }

  /**
   * Background Music: Peaceful School Lofi Ambient Synthesizer
   */
  public startBgm() {
    if (!this.musicEnabled || this.isBgmPlaying) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.bgmGain) return;

      this.isBgmPlaying = true;
      // Gentle calm pentatonic progression (D, F#, G, A chord arpeggios)
      const notes = [
        293.66, 369.99, 440.00, 587.33,
        329.63, 392.00, 493.88, 659.25,
        261.63, 329.63, 392.00, 523.25,
        349.23, 440.00, 523.25, 698.46
      ];

      let noteIndex = 0;
      const playNextNote = () => {
        if (!this.isBgmPlaying || !this.ctx || !this.bgmGain || !this.musicEnabled) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        const freq = notes[noteIndex % notes.length];
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.09, now + 0.25);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.bgmGain);

        osc.start(now);
        osc.stop(now + 1.55);

        noteIndex++;
      };

      // Play note every 600ms
      playNextNote();
      this.bgmInterval = window.setInterval(playNextNote, 600);
    } catch {
      // Silent fail
    }
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const sound = new SoundManager();
