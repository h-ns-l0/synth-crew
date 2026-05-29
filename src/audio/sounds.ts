import type { SoundModule } from "../types";

export const SOUNDS: SoundModule[] = [
  { id: "kick",    label: "Kick",     kind: "drum",  color: "#D85A30" },
  { id: "snare",   label: "Snare",    kind: "drum",  color: "#D85A30" },
  { id: "hat",     label: "Hi-hat",   kind: "drum",  color: "#EF9F27" },
  { id: "subbass", label: "Sub bass", kind: "bass",  color: "#378ADD" },
  { id: "arp",     label: "Arp",      kind: "synth", color: "#1D9E75" },
  { id: "pad",     label: "Pad",      kind: "synth", color: "#1D9E75" },
  { id: "bleep",   label: "Bleep",    kind: "synth", color: "#7F77DD" },
  { id: "chant",   label: "Chant",    kind: "vocal", color: "#7F77DD" },
];

export const SLOT_COUNT = 5;

export const getSound = (id: string) => SOUNDS.find((s) => s.id === id);