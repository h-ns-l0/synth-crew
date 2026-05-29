import { getSound } from "../../audio/sounds";

interface Props {
  slot: number;
  soundId: string | null;
}

export default function RobotPerformer({ soundId }: Props) {
  const sound = soundId ? getSound(soundId) : null;

  return (
    <div style={{ textAlign: "center" }}>
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
    </div>
  );
}