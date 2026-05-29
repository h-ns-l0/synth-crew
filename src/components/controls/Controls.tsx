import * as Tone from "tone";
import { useStudio } from "../../hooks/useStudio";

export default function Controls() {
  const { state, dispatch } = useStudio();

  function togglePlay() {
    // 사용자 클릭 순간에 AudioContext를 깨운다(자동재생 정책 충족).
    void Tone.start();
    dispatch({ type: "TOGGLE_PLAY" });
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
      }}
    >
      <button type="button" onClick={togglePlay}>
        {state.transport.isPlaying ? "■ 정지" : "▶ 재생"}
      </button>
    </div>
  );
}
