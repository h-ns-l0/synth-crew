import type { CSSProperties } from "react";
import type { SoundModule } from "../../types";
import styles from "./SoundChip.module.css";

interface Props {
  sound: SoundModule;
  selected: boolean;
  onClick: () => void;
}

// 팔레트의 사운드 1개. 평소엔 파스텔 칩, 선택되면 색이 가득 찬다.
export default function SoundChip({ sound, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.chip} ${selected ? styles.selected : ""}`}
      style={{ "--accent": sound.color } as CSSProperties}
    >
      {sound.label}
    </button>
  );
}
