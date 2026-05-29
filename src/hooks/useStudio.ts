import { useContext } from "react";
import { StudioContext } from "../context/studioContext";

export function useStudio() {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error("useStudio는 StudioProvider 안에서만 쓸 수 있어");
  return ctx;
}