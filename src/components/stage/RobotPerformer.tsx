import { getSound } from "../../audio/sounds";

interface Props {
  slot: number;
  soundId: string | null;
  onClick: () => void;
}

export default function RobotPerformer({ soundId, onClick }: Props) {
  const sound = soundId ? getSound(soundId) : null;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        textAlign: "center",
        color: "inherit",
        font: "inherit",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          margin: "0 auto 6px",
          borderRadius: "50%",
          border: sound ? `2px solid ${sound.color}` : "2px dashed #888",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
        }}
      >
        {sound ? "ROBO" : "+"}
      </div>
      <span style={{ fontSize: 12 }}>{sound ? sound.label : "비어있음"}</span>
    </button>
  );
}
