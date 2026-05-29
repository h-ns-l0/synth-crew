import { useStudio } from "../../hooks/useStudio";
import RobotPerformer from "./RobotPerformer";

interface Props {
  selectedSoundId: string | null;
}

export default function Stage({ selectedSoundId }: Props) {
  const { state, dispatch } = useStudio();

  function handleSlotClick(slot: number) {
    if (state.arrangement[slot]) {
      // 이미 채워진 슬롯을 누르면 비움
      dispatch({ type: "REMOVE_SOUND", slot });
    } else if (selectedSoundId) {
      // 빈 슬롯 + 팔레트에서 고른 사운드가 있으면 배치
      dispatch({ type: "PLACE_SOUND", slot, soundId: selectedSoundId });
    }
  }

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
        <RobotPerformer
          key={slot}
          slot={slot}
          soundId={soundId}
          onClick={() => handleSlotClick(slot)}
        />
      ))}
    </div>
  );
}
