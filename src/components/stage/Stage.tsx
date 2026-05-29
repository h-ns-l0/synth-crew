import { useStudio } from "../../hooks/useStudio";
import RobotPerformer from "./RobotPerformer";
import Visualizer from "../visualizer/Visualizer";
import styles from "./Stage.module.css";

interface Props {
  selectedSoundId: string | null;
}

export default function Stage({ selectedSoundId }: Props) {
  const { state, dispatch } = useStudio();

  function handleSlotClick(slot: number) {
    if (state.arrangement[slot]) {
      dispatch({ type: "REMOVE_SOUND", slot }); // 채워진 슬롯 → 비움
    } else if (selectedSoundId) {
      dispatch({ type: "PLACE_SOUND", slot, soundId: selectedSoundId }); // 빈 슬롯 + 선택된 사운드 → 배치
    }
  }

  return (
    <div className={styles.stage}>
      <Visualizer />
      <div className={styles.grid}>
        {state.arrangement.map((soundId, slot) => (
          <RobotPerformer
            key={slot}
            slot={slot}
            soundId={soundId}
            playing={state.transport.isPlaying}
            onClick={() => handleSlotClick(slot)}
          />
        ))}
      </div>
    </div>
  );
}
