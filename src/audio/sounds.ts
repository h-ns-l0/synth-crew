import type { SoundModule } from "../types";

// id는 voices.ts의 register(id, ...)와 1:1로 맞춰야 소리가 난다.
export const SOUNDS: SoundModule[] = [
  // 드럼
  { id: "kick",      label: "Kick",      kind: "drum",  color: "#D85A30" },
  { id: "snare",     label: "Snare",     kind: "drum",  color: "#D85A30" },
  { id: "hat",       label: "Hi-hat",    kind: "drum",  color: "#EF9F27" },
  { id: "clap",      label: "Clap",      kind: "drum",  color: "#EF9F27" },
  { id: "openhat",   label: "Open hat",  kind: "drum",  color: "#EF9F27" },
  { id: "shaker",    label: "Shaker",    kind: "drum",  color: "#EF9F27" },
  // 베이스
  { id: "subbass",   label: "Sub bass",  kind: "bass",  color: "#378ADD" },
  { id: "groovebass",label: "Groove bass",kind: "bass", color: "#378ADD" },
  // 신스
  { id: "pad",       label: "Pad",       kind: "synth", color: "#1D9E75" },
  { id: "arp",       label: "Arp",       kind: "synth", color: "#1D9E75" },
  { id: "stab",      label: "Stab",      kind: "synth", color: "#7F77DD" },
  { id: "bleep",     label: "Bleep",     kind: "synth", color: "#7F77DD" },
  { id: "lead",      label: "Lead",      kind: "synth", color: "#7F77DD" },
  // 보컬(합성)
  { id: "chant",     label: "Chant",     kind: "vocal", color: "#7F77DD" },
  { id: "vox",       label: "Vox hook",  kind: "vocal", color: "#7F77DD" },
];

export const SLOT_COUNT = 8;

export const getSound = (id: string) => SOUNDS.find((s) => s.id === id);
