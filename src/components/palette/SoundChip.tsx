import type { SoundModule } from "../../types";

interface Props {
  sound: SoundModule;
  selected: boolean;
  onClick: () => void;
}

// 팔레트의 사운드 1개. 선택되면 채워진 색으로 강조.
export default function SoundChip({ sound, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 999,
        border: `2px solid ${sound.color}`,
        background: selected ? sound.color : "transparent",
        color: selected ? "#0b0b0c" : "#f1efe8",
        cursor: "pointer",
        fontSize: 14,
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: selected ? "#0b0b0c" : sound.color,
        }}
      />
      {sound.label}
    </button>
  );
}
