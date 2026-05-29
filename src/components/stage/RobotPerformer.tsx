import type { CSSProperties } from "react";
import {
  IconMoodSmile,
  IconMoodNerd,
  IconMoodHappy,
  IconMicrophone2,
  IconPlus,
} from "@tabler/icons-react";
import { getSound } from "../../audio/sounds";
import type { SoundKind } from "../../types";
import styles from "./RobotPerformer.module.css";

interface Props {
  slot: number;
  soundId: string | null;
  playing: boolean;
  onClick: () => void;
}

// 사운드 종류별로 무대 위 로봇의 표정 아이콘을 달리한다.
const FACE: Record<SoundKind, typeof IconMoodSmile> = {
  drum: IconMoodSmile,
  bass: IconMoodNerd,
  synth: IconMoodHappy,
  vocal: IconMicrophone2,
};

export default function RobotPerformer({ soundId, playing, onClick }: Props) {
  const sound = soundId ? getSound(soundId) : null;
  const bobbing = sound && playing; // 재생 중이고 사운드가 올라간 슬롯만 들썩인다
  const Face = sound ? FACE[sound.kind] : IconPlus;

  const avatarClass = [
    styles.avatar,
    sound ? styles.filled : styles.empty,
    bobbing ? styles.bobbing : "",
  ].join(" ");

  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.performer}
      style={{ "--accent": sound?.color } as CSSProperties}
    >
      <div className={avatarClass}>
        <Face size={26} stroke={2} />
      </div>
      <span className={sound ? styles.label : styles.labelEmpty}>
        {sound ? sound.label : "비어있음"}
      </span>
    </button>
  );
}
