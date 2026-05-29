export type SoundKind = "drum" | "bass" | "synth" | "vocal";

export interface SoundModule {
  id: string;      // "kick", "arp" ...
  label: string;   // "Kick"
  kind: SoundKind;
  color: string;   // 액센트 색
}

// 무대 배치: 슬롯별로 사운드 id, 비어있으면 null
export type Arrangement = (string | null)[];

export interface TransportState {
  isPlaying: boolean;
  bpm: number;
}

export interface StudioState {
  arrangement: Arrangement;
  transport: TransportState;
}

export type StudioAction =
  | { type: "PLACE_SOUND"; slot: number; soundId: string }
  | { type: "REMOVE_SOUND"; slot: number }
  | { type: "CLEAR" }
  | { type: "TOGGLE_PLAY" }
  | { type: "SET_BPM"; bpm: number }
  | { type: "LOAD"; arrangement: Arrangement };