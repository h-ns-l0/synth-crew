import type { StudioState, StudioAction } from "../types";
import { SLOT_COUNT } from "../audio/sounds";

export const initialState: StudioState = {
  arrangement: Array(SLOT_COUNT).fill(null),
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