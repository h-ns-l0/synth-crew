import type { StudioState, StudioAction } from "../types";
import { SLOT_COUNT } from "../audio/sounds";

export const initialState: StudioState = {
  // ⚠️ "kick"은 렌더 확인용 임시 시드. Day 3에서 클릭 배치 붙이면 null로 되돌릴 거야.
  arrangement: ["kick", null, null, null, null],
  transport: { isPlaying: false, bpm: 102 },
};

export function studioReducer(state: StudioState, action: StudioAction): StudioState {
  switch (action.type) {
    case "PLACE_SOUND": {
      const arrangement = [...state.arrangement];
      arrangement[action.slot] = action.soundId;
      return { ...state, arrangement };
    }
    case "REMOVE_SOUND": {
      const arrangement = [...state.arrangement];
      arrangement[action.slot] = null;
      return { ...state, arrangement };
    }
    case "CLEAR":
      return { ...state, arrangement: Array(SLOT_COUNT).fill(null) };
    case "TOGGLE_PLAY":
      return { ...state, transport: { ...state.transport, isPlaying: !state.transport.isPlaying } };
    case "SET_BPM":
      return { ...state, transport: { ...state.transport, bpm: action.bpm } };
    case "LOAD":
      return { ...state, arrangement: action.arrangement };
    default:
      return state;
  }
}