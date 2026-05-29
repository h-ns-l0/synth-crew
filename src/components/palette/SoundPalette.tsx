import { SOUNDS } from "../../audio/sounds";
import SoundChip from "./SoundChip";

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

// 배치 가능한 사운드 목록. 칩을 누르면 "이걸 놓겠다"고 선택.
export default function SoundPalette({ selectedId, onSelect }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 8,
        padding: 16,
      }}
    >
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
