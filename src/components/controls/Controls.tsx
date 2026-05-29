import { useState } from "react";
import * as Tone from "tone";
import {
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
  IconShare,
  IconCheck,
} from "@tabler/icons-react";
import { useStudio } from "../../hooks/useStudio";
import { encodeArrangement } from "../../lib/share";
import styles from "./Controls.module.css";

export default function Controls() {
  const { state, dispatch } = useStudio();
  const [copied, setCopied] = useState(false);

  function togglePlay() {
    // 사용자 클릭 순간에 AudioContext를 깨운다(자동재생 정책 충족).
    void Tone.start();
    dispatch({ type: "TOGGLE_PLAY" });
  }

  async function share() {
    const code = encodeArrangement(state.arrangement);
    const url = `${window.location.origin}/jam/${code}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.prompt("공유 링크", url); // 클립보드 권한이 없으면 직접 복사하도록
    }
  }

  return (
    <div className={styles.controls}>
      <button type="button" onClick={togglePlay} className={styles.play} aria-label={state.transport.isPlaying ? "정지" : "재생"}>
        {state.transport.isPlaying ? (
          <IconPlayerStopFilled size={18} />
        ) : (
          <IconPlayerPlayFilled size={18} />
        )}
      </button>

      <label className={styles.bpm}>
        BPM
        <input
          type="range"
          min={70}
          max={160}
          value={state.transport.bpm}
          onChange={(e) =>
            dispatch({ type: "SET_BPM", bpm: Number(e.target.value) })
          }
        />
        <span className={styles.bpmValue}>{state.transport.bpm}</span>
      </label>

      <button type="button" onClick={share} className={styles.share}>
        {copied ? <IconCheck size={14} /> : <IconShare size={14} />}
        {copied ? "복사됨" : "공유"}
      </button>
    </div>
  );
}
