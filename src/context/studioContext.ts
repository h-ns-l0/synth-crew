import { createContext, type Dispatch } from "react";
import type { StudioState, StudioAction } from "../types";

// 전역 상태 값의 형태: 읽기용 state + 변경용 dispatch
export interface StudioContextValue {
  state: StudioState;
  dispatch: Dispatch<StudioAction>;
}

// Context 객체만 따로 분리 → Provider/훅 파일과 떼어내 Fast Refresh(HMR) 깨짐 방지
export const StudioContext = createContext<StudioContextValue | null>(null);
