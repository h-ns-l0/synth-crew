// 모든 멜로디 보이스가 공유하는 코드 진행 — Am · F · C · G (밝은 팝 진행).
// 음을 한 곳에서 관리해 어떤 조합을 올려도 서로 충돌하지 않게 한다.
export const KEY = "C major / A minor";

export interface Chord {
  name: string;
  triad: string[]; // pad/stab이 누르는 3화음
  bass: string; // subbass/groovebass 근음
  arp: string[]; // arp가 8분음표로 훑는 4음 (한 마디에 2바퀴)
  lead: string; // lead가 길게 끄는 탑 노트
}

// 한 마디(16스텝)마다 코드 하나 → 4마디 = 1순환.
export const PROGRESSION: Chord[] = [
  { name: "Am", triad: ["A3", "C4", "E4"], bass: "A1", arp: ["A3", "C4", "E4", "A4"], lead: "E5" },
  { name: "F",  triad: ["F3", "A3", "C4"], bass: "F1", arp: ["F3", "A3", "C4", "F4"], lead: "C5" },
  { name: "C",  triad: ["C4", "E4", "G4"], bass: "C2", arp: ["C4", "E4", "G4", "C5"], lead: "G5" },
  { name: "G",  triad: ["G3", "B3", "D4"], bass: "G1", arp: ["G3", "B3", "D4", "G4"], lead: "D5" },
];

export const STEPS_PER_BAR = 16;
export const BARS = PROGRESSION.length; // 4
export const STEPS = BARS * STEPS_PER_BAR; // 64 = 4마디 루프

// 전체 스텝(0~63)에서 지금 어느 코드인지 / 마디 안에서 몇 번째 칸인지.
export const chordAt = (step: number): Chord =>
  PROGRESSION[Math.floor(step / STEPS_PER_BAR) % BARS];
export const stepInBar = (step: number): number => step % STEPS_PER_BAR;
