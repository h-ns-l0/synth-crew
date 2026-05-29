import { createContext, type Dispatch } from "react";
import type { StudioState, StudioAction } from "../types";

export interface StudioContextValue {
  state: StudioState;
  dispatch: Dispatch<StudioAction>;
}

export const StudioContext = createContext<StudioContextValue | null>(null);