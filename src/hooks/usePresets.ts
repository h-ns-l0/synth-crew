import { useCallback, useEffect, useState } from "react";
import type { Arrangement } from "../types";

export interface Preset {
  name: string;
  arrangement: Arrangement;
}

const STORAGE_KEY = "synthcrew.presets";

// 사용자가 만든 조합을 브라우저 localStorage에 저장/로드/삭제. 새로고침·재방문에도 유지된다.
export function usePresets() {
  const [presets, setPresets] = useState<Preset[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Preset[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
  }, [presets]);

  const save = useCallback((name: string, arrangement: Arrangement) => {
    setPresets((prev) => [
      ...prev.filter((p) => p.name !== name), // 같은 이름이면 덮어쓰기
      { name, arrangement },
    ]);
  }, []);

  const remove = useCallback((name: string) => {
    setPresets((prev) => prev.filter((p) => p.name !== name));
  }, []);

  return { presets, save, remove };
}
