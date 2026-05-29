import { useReducer, type ReactNode } from "react";
import { StudioContext } from "./studioContext";
import { studioReducer, initialState } from "./studioReducer";

export function StudioProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(studioReducer, initialState);
  return (
    <StudioContext.Provider value={{ state, dispatch }}>
      {children}
    </StudioContext.Provider>
  );
}