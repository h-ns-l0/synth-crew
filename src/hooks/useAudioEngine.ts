import { useEffect, useRef } from "react";
import * as Tone from "tone";
import { useStudio } from "./useStudio";
import { createVoices, type VoiceRig } from "../audio/voices";
import { getAnalyser } from "../audio/master";

// 전역 상태(arrangement/transport)를 실제 소리로 바꾸는 다리.
// 화면을 그리지 않으므로 컴포넌트가 아닌 훅으로 둔다.
export function useAudioEngine() {
  const { state } = useStudio();
  const rigRef = useRef<VoiceRig | null>(null);

  // 1) 신스 + 시퀀스 1회 생성 (언마운트 시 정리)
  useEffect(() => {
    const rig = createVoices(getAnalyser());
    rigRef.current = rig;
    return () => {
      rig.dispose();
      rigRef.current = null;
    };
  }, []);

  // 2) 배치 변화 → 해당 보이스 on/off
  useEffect(() => {
    const rig = rigRef.current;
    if (!rig) return;
    const active = new Set(state.arrangement.filter((id): id is string => id !== null));
    Object.values(rig.voices).forEach((v) => v.setActive(active.has(v.id)));
  }, [state.arrangement]);

  // 3) 재생/정지 (재생 시 AudioContext 해제 — 브라우저 자동재생 정책)
  useEffect(() => {
    const transport = Tone.getTransport();
    if (state.transport.isPlaying) {
      void Tone.start().then(() => transport.start());
    } else {
      transport.stop();
    }
  }, [state.transport.isPlaying]);

  // 4) BPM 동기화
  useEffect(() => {
    Tone.getTransport().bpm.value = state.transport.bpm;
  }, [state.transport.bpm]);
}
