import * as Tone from "tone";
import { ARP, BASS, CHANT, CHORD, LEAD_HI } from "./scale";

// 16분음표 16칸 = 1마디. 모든 패턴이 이 그리드 위에서 돈다.
const STEPS = 16;

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
    seq.start(0); // Transport가 돌면 매 마디 반복
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

  // --- 드럼 ---
  const kick = new Tone.MembraneSynth();
  register("kick", kick, (time, step) => {
    if (step % 4 === 0) kick.triggerAttackRelease("C1", "8n", time);
  });

  const snare = new Tone.NoiseSynth({
    envelope: { attack: 0.001, decay: 0.2, sustain: 0 },
  });
  snare.volume.value = -6;
  register("snare", snare, (time, step) => {
    if (step === 4 || step === 12) snare.triggerAttackRelease("8n", time);
  });

  const hat = new Tone.NoiseSynth({
    envelope: { attack: 0.001, decay: 0.05, sustain: 0 },
  });
  hat.volume.value = -16;
  register("hat", hat, (time, step) => {
    if (step % 2 === 0) hat.triggerAttackRelease("16n", time);
  });

  // --- 베이스 ---
  const subbass = new Tone.MonoSynth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.4, release: 0.2 },
  });
  subbass.volume.value = -6;
  register("subbass", subbass, (time, step) => {
    if (step === 0) subbass.triggerAttackRelease(BASS.root, "4n", time);
    else if (step === 8) subbass.triggerAttackRelease(BASS.fifth, "4n", time);
  });

  // --- 신스 ---
  const arp = new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.1 },
  });
  arp.volume.value = -10;
  register("arp", arp, (time, step) => {
    if (step % 2 === 0) arp.triggerAttackRelease(ARP[step / 2], "16n", time);
  });

  const pad = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "sawtooth" },
    envelope: { attack: 0.4, decay: 0.2, sustain: 0.8, release: 1.5 },
  });
  pad.volume.value = -20;
  register("pad", pad, (time, step) => {
    if (step === 0) pad.triggerAttackRelease(CHORD, "1m", time);
  });

  const bleep = new Tone.Synth({
    oscillator: { type: "square" },
    envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.05 },
  });
  bleep.volume.value = -16;
  register("bleep", bleep, (time, step) => {
    if (step % 4 === 3) bleep.triggerAttackRelease(LEAD_HI, "16n", time);
  });

  // --- 보컬(합성) ---
  const chant = new Tone.FMSynth({
    harmonicity: 1.5,
    modulationIndex: 2,
    envelope: { attack: 0.3, decay: 0.1, sustain: 0.7, release: 0.8 },
  });
  chant.volume.value = -12;
  register("chant", chant, (time, step) => {
    if (step === 0) chant.triggerAttackRelease(CHANT[0], "2n", time);
    else if (step === 8) chant.triggerAttackRelease(CHANT[1], "2n", time);
  });

  return {
    voices,
    dispose: () => Object.values(voices).forEach((v) => v.dispose()),
  };
}
