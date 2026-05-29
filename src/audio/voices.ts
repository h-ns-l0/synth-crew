import * as Tone from "tone";
import { STEPS, chordAt, stepInBar } from "./scale";

export interface Voice {
  id: string;
  setActive: (active: boolean) => void; // 슬롯 배치 = true, 제거 = false
  dispose: () => void;
}

export interface VoiceRig {
  voices: Record<string, Voice>;
  dispose: () => void;
}

// 모든 신스를 합성하고 Transport에 패턴을 건다. output에 연결(기본=스피커).
// 멜로디 보이스는 chordAt(step)으로 "지금 코드"를 읽어 진행을 따라간다.
export function createVoices(output: Tone.ToneAudioNode = Tone.getDestination()): VoiceRig {
  const voices: Record<string, Voice> = {};

  // 신스 1개 + 트리거 함수를 받아 "활성 플래그로 게이트되는 시퀀스"를 만든다.
  function register(
    id: string,
    synth: Tone.ToneAudioNode & { dispose: () => void },
    trigger: (time: number, step: number) => void,
  ) {
    let active = false;
    synth.connect(output);
    const seq = new Tone.Sequence(
      (time, step) => {
        if (active) trigger(time, step);
      },
      Array.from({ length: STEPS }, (_, i) => i),
      "16n",
    );
    seq.start(0); // Transport가 돌면 4마디마다 반복
    voices[id] = {
      id,
      setActive: (a) => {
        active = a;
      },
      dispose: () => {
        seq.dispose();
        synth.dispose();
      },
    };
  }

  // ===== 드럼 =====
  const kick = new Tone.MembraneSynth();
  register("kick", kick, (time, step) => {
    if (stepInBar(step) % 4 === 0) kick.triggerAttackRelease("C1", "8n", time);
  });

  const snare = new Tone.NoiseSynth({
    envelope: { attack: 0.001, decay: 0.2, sustain: 0 },
  });
  snare.volume.value = -6;
  register("snare", snare, (time, step) => {
    const s = stepInBar(step);
    if (s === 4 || s === 12) snare.triggerAttackRelease("8n", time);
  });

  const hat = new Tone.NoiseSynth({
    envelope: { attack: 0.001, decay: 0.05, sustain: 0 },
  });
  hat.volume.value = -16;
  register("hat", hat, (time, step) => {
    if (stepInBar(step) % 2 === 0) hat.triggerAttackRelease("16n", time);
  });

  const clap = new Tone.NoiseSynth({
    noise: { type: "pink" },
    envelope: { attack: 0.002, decay: 0.18, sustain: 0 },
  });
  clap.volume.value = -10;
  register("clap", clap, (time, step) => {
    const s = stepInBar(step);
    if (s === 4 || s === 12) clap.triggerAttackRelease("8n", time);
  });

  const openhat = new Tone.NoiseSynth({
    envelope: { attack: 0.001, decay: 0.25, sustain: 0 },
  });
  openhat.volume.value = -20;
  register("openhat", openhat, (time, step) => {
    if (stepInBar(step) % 4 === 2) openhat.triggerAttackRelease("8n", time); // 오프비트
  });

  const shaker = new Tone.NoiseSynth({
    envelope: { attack: 0.001, decay: 0.03, sustain: 0 },
  });
  shaker.volume.value = -24;
  register("shaker", shaker, (time, step) => {
    if (stepInBar(step) % 2 === 1) shaker.triggerAttackRelease("32n", time); // 오프비트 16분
  });

  // ===== 베이스 =====
  const subbass = new Tone.MonoSynth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.4, release: 0.2 },
  });
  subbass.volume.value = -6;
  register("subbass", subbass, (time, step) => {
    const s = stepInBar(step);
    if (s === 0 || s === 8) subbass.triggerAttackRelease(chordAt(step).bass, "2n", time);
  });

  const groovebass = new Tone.MonoSynth({
    oscillator: { type: "sawtooth" },
    filterEnvelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.1, baseFrequency: 200, octaves: 3 },
    envelope: { attack: 0.01, decay: 0.15, sustain: 0.2, release: 0.1 },
  });
  groovebass.volume.value = -10;
  register("groovebass", groovebass, (time, step) => {
    const s = stepInBar(step);
    // 당김음 베이스라인: 근음을 한 옥타브 올려 통통 튕긴다.
    if (s === 0 || s === 6 || s === 8 || s === 14) {
      const root = chordAt(step).bass;
      groovebass.triggerAttackRelease(Tone.Frequency(root).transpose(12).toNote(), "16n", time);
    }
  });

  // ===== 신스 =====
  const pad = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "sawtooth" },
    envelope: { attack: 0.4, decay: 0.2, sustain: 0.8, release: 1.5 },
  });
  pad.volume.value = -20;
  register("pad", pad, (time, step) => {
    if (stepInBar(step) === 0) pad.triggerAttackRelease(chordAt(step).triad, "1m", time);
  });

  const arp = new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.1 },
  });
  arp.volume.value = -10;
  register("arp", arp, (time, step) => {
    const s = stepInBar(step);
    if (s % 2 === 0) {
      const notes = chordAt(step).arp; // 4음을 8분음표로 → 마디에 2바퀴
      arp.triggerAttackRelease(notes[(s / 2) % notes.length], "16n", time);
    }
  });

  const stab = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "square" },
    envelope: { attack: 0.005, decay: 0.12, sustain: 0, release: 0.08 },
  });
  stab.volume.value = -18;
  register("stab", stab, (time, step) => {
    const s = stepInBar(step);
    if (s === 2 || s === 6 || s === 10 || s === 14) {
      stab.triggerAttackRelease(chordAt(step).triad, "16n", time); // 오프비트 코드 스탭
    }
  });

  const bleep = new Tone.Synth({
    oscillator: { type: "square" },
    envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.05 },
  });
  bleep.volume.value = -18;
  register("bleep", bleep, (time, step) => {
    if (stepInBar(step) % 4 === 3) {
      const top = Tone.Frequency(chordAt(step).lead).transpose(12).toNote();
      bleep.triggerAttackRelease(top, "16n", time);
    }
  });

  const lead = new Tone.Synth({
    oscillator: { type: "sawtooth" },
    envelope: { attack: 0.02, decay: 0.2, sustain: 0.5, release: 0.3 },
  });
  lead.volume.value = -14;
  register("lead", lead, (time, step) => {
    const s = stepInBar(step);
    // 코드마다 탑 노트를 길게 노래하는 리드 선율.
    if (s === 0) lead.triggerAttackRelease(chordAt(step).lead, "2n", time);
    else if (s === 10) lead.triggerAttackRelease(chordAt(step).arp[2], "8n", time);
  });

  // ===== 보컬(합성) =====
  const chant = new Tone.FMSynth({
    harmonicity: 1.5,
    modulationIndex: 2,
    envelope: { attack: 0.3, decay: 0.1, sustain: 0.7, release: 0.8 },
  });
  chant.volume.value = -12;
  register("chant", chant, (time, step) => {
    const s = stepInBar(step);
    if (s === 0 || s === 8) chant.triggerAttackRelease(chordAt(step).triad[0], "2n", time);
  });

  const vox = new Tone.FMSynth({
    harmonicity: 2,
    modulationIndex: 4,
    envelope: { attack: 0.1, decay: 0.1, sustain: 0.6, release: 0.5 },
  });
  vox.volume.value = -16;
  register("vox", vox, (time, step) => {
    if (stepInBar(step) === 8) vox.triggerAttackRelease(chordAt(step).triad[2], "4n", time); // 높은 "오" 훅
  });

  return {
    voices,
    dispose: () => Object.values(voices).forEach((v) => v.dispose()),
  };
}
