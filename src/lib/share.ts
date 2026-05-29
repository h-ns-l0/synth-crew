import { SOUNDS, SLOT_COUNT } from "../audio/sounds";
import type { Arrangement } from "../types";

// 배치 ↔ URL 코드. 슬롯마다 사운드 인덱스를 base36 한 글자로, 빈 슬롯은 "-".
// 예) [kick, null, arp, null, null] -> "0-4--"
export function encodeArrangement(arr: Arrangement): string {
  return arr
    .map((id) => {
      if (id === null) return "-";
      const idx = SOUNDS.findIndex((s) => s.id === id);
      return idx >= 0 ? idx.toString(36) : "-";
    })
    .join("");
}

export function decodeArrangement(code: string): Arrangement {
  const arr: Arrangement = Array(SLOT_COUNT).fill(null);
  for (let i = 0; i < SLOT_COUNT; i++) {
    const ch = code[i];
    if (!ch || ch === "-") continue;
    arr[i] = SOUNDS[parseInt(ch, 36)]?.id ?? null;
  }
  return arr;
}
