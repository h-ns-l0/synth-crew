import type { CSSProperties } from "react";
import { getSound } from "../../audio/sounds";
import styles from "./RobotPerformer.module.css";

interface Props {
  slot: number;
  soundId: string | null;
  playing: boolean;
  onClick: () => void;
}

export default function RobotPerformer({ soundId, playing, onClick }: Props) {
  const sound = soundId ? getSound(soundId) : null;
  const bobbing = sound && playing; // 재생 중이고 사운드가 올라간 슬롯만 들썩인다

  const headClass = [
    styles.head,
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
      <div className={headClass}>{sound ? "ROBO" : "+"}</div>
      <span className={styles.label}>{sound ? sound.label : "비어있음"}</span>
    </button>
  );
}
