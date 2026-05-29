import { SOUNDS } from "../../audio/sounds";
import SoundChip from "./SoundChip";
import styles from "./SoundPalette.module.css";

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

// 배치 가능한 사운드 목록. 칩을 누르면 "이걸 놓겠다"고 선택.
export default function SoundPalette({ selectedId, onSelect }: Props) {
  return (
    <div className={styles.palette}>
      {SOUNDS.map((sound) => (
        <SoundChip
          key={sound.id}
          sound={sound}
          selected={sound.id === selectedId}
          onClick={() => onSelect(sound.id)}
        />
      ))}
    </div>
  );
}
