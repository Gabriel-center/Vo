/*
 * A VALSA
 * Composição original, 16 compassos em 3/4, lá menor.
 * Tocada com Web Audio: sem arquivos de som, tudo sintetizado.
 *
 * A história revela a valsa aos poucos: 4 compassos no dia 1,
 * 8 no dia 2, 12 no dia 4 e os 16 quando a Lúcia escreve o final.
 */

(function () {
  // [nota, tempos]  (1 tempo = 1 semínima)
  const VALSA = [
    { ch: "Am", m: [["E5", 2], ["D5", 1]] },
    { ch: "Am", m: [["C5", 1], ["B4", 1], ["C5", 1]] },
    { ch: "Dm", m: [["A4", 2], ["F5", 1]] },
    { ch: "E",  m: [["E5", 3]] },

    { ch: "Am", m: [["E5", 2], ["D5", 1]] },
    { ch: "F",  m: [["C5", 1], ["D5", 1], ["E5", 1]] },
    { ch: "G",  m: [["D5", 1], ["C5", 1], ["B4", 1]] },
    { ch: "C",  m: [["C5", 3]] },

    { ch: "F",  m: [["A5", 2], ["G5", 1]] },
    { ch: "C",  m: [["E5", 1], ["F5", 1], ["G5", 1]] },
    { ch: "Dm", m: [["F5", 2], ["E5", 1]] },
    { ch: "E",  m: [["D5", 1], ["C5", 1], ["B4", 1]] },

    { ch: "Am", m: [["C5", 2], ["E5", 1]] },
    { ch: "Dm", m: [["A5", 2], ["F5", 1]] },
    { ch: "E7", m: [["E5", 1], ["D5", 1], ["G#4", 1]] },
    { ch: "Am", m: [["A4", 3]] }
  ];

  // baixo no 1º tempo, acorde no 2º e 3º (o "um-dois-três" da valsa)
  const CHORDS = {
    Am: { b: "A2", c: ["C4", "E4"] },
    Dm: { b: "D3", c: ["F3", "A3"] },
    E:  { b: "E2", c: ["G#3", "B3"] },
    E7: { b: "E2", c: ["G#3", "D4"] },
    F:  { b: "F2", c: ["A3", "C4"] },
    G:  { b: "G2", c: ["B3", "D4"] },
    C:  { b: "C3", c: ["E3", "G3"] }
  };

  const NOTE_INDEX = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  function freq(name) {
    const m = /^([A-G])(#|b)?(\d)$/.exec(name);
    let n = NOTE_INDEX[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0);
    const midi = (parseInt(m[3], 10) + 1) * 12 + n;
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  let ctx = null, master = null, wet = null, out = null;
  function setup() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.55;

    // um pouco de sala: reverberação feita de ruído que decai
    const conv = ctx.createConvolver();
    const len = Math.floor(ctx.sampleRate * 2.4);
    const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
    }
    conv.buffer = ir;
    wet = ctx.createGain();
    wet.gain.value = 0.28;

    master.connect(ctx.destination);
    master.connect(conv);
    conv.connect(wet);
    wet.connect(ctx.destination);
  }

  // um "piano" simples: triângulo + harmônicos, ataque rápido, decaimento longo
  function key(t, f, vel, len, bright) {
    const g = ctx.createGain();
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(bright, t);
    lp.frequency.exponentialRampToValueAtTime(Math.max(400, bright * 0.35), t + len);
    lp.Q.value = 0.4;

    const oscs = [
      ["triangle", f, 1],
      ["sine", f * 2, 0.22],
      ["sine", f * 3.01, 0.06],
      ["triangle", f * 1.003, 0.35]
    ].map(([type, fr, amp]) => {
      const o = ctx.createOscillator();
      const a = ctx.createGain();
      o.type = type; o.frequency.value = fr; a.gain.value = amp;
      o.connect(a); a.connect(g);
      return o;
    });

    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vel, t + 0.008);
    g.gain.exponentialRampToValueAtTime(vel * 0.35, t + 0.25);
    g.gain.exponentialRampToValueAtTime(0.0001, t + len + 1.1);

    g.connect(lp); lp.connect(out || master);
    oscs.forEach(o => { o.start(t); o.stop(t + len + 1.2); });
  }

  let playing = null;

  /*
   * play(bars, onBar, onEnd): toca os primeiros `bars` compassos.
   * Se a valsa não estiver completa, ela para no meio, como uma lembrança.
   * Cada execução tem o seu próprio "bus", para poder ser interrompida.
   */
  function play(bars, onBar, onEnd) {
    setup();
    if (ctx.state === "suspended") ctx.resume();
    stop();

    const bus = ctx.createGain();
    bus.gain.value = 1;
    bus.connect(master);
    out = bus;

    const beat = 0.62;               // ~97 bpm, devagar ("Você sempre corre")
    const start = ctx.currentTime + 0.12;
    const timers = [];
    let t = start;
    const complete = bars >= VALSA.length;

    for (let i = 0; i < bars; i++) {
      const bar = VALSA[i];
      // ritardando no fim, só quando a valsa termina de verdade
      const b = (complete && i === bars - 1) ? beat * 1.5 : (complete && i === bars - 2) ? beat * 1.15 : beat;
      const chord = CHORDS[bar.ch];

      key(t, freq(chord.b), 0.16, b * 2.6, 900);
      chord.c.forEach(n => key(t + b, freq(n), 0.06, b * 0.8, 1400));
      chord.c.forEach(n => key(t + b * 2, freq(n), 0.055, b * 0.8, 1400));

      let mt = t;
      bar.m.forEach(([n, beats]) => {
        key(mt, freq(n), 0.24, beats * b * 1.1, 3200);
        mt += beats * b;
      });

      const at = (t - ctx.currentTime) * 1000;
      timers.push(setTimeout(() => onBar && onBar(i), Math.max(0, at)));
      t += 3 * b;
    }

    const endMs = (t - ctx.currentTime) * 1000 + (complete ? 1800 : 400);
    timers.push(setTimeout(() => { playing = null; onEnd && onEnd(complete); }, endMs));
    playing = { timers, bus };
  }

  function stop() {
    if (!playing) return;
    const { timers, bus } = playing;
    timers.forEach(clearTimeout);
    playing = null;
    const now = ctx.currentTime;
    bus.gain.cancelScheduledValues(now);
    bus.gain.setValueAtTime(bus.gain.value, now);
    bus.gain.linearRampToValueAtTime(0.0001, now + 0.2);
    setTimeout(() => bus.disconnect(), 300);
  }

  window.Valsa = { play, stop, total: VALSA.length, isPlaying: () => !!playing };
})();
