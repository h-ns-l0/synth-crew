import { useStudio } from "../../hooks/useStudio";
import RobotPerformer from "./RobotPerformer";

export default function Stage() {
  const { state } = useStudio();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${state.arrangement.length}, 1fr)`,
        gap: 8,
        padding: 16,
        background: "#1f1f1d",
        borderRadius: 12,
        color: "#f1efe8",
      }}
    >
      {state.arrangement.map((soundId, slot) => (
        <RobotPerformer key={slot} slot={slot} soundId={soundId} />
      ))}
    </div>
  );
}