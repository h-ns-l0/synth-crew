import * as Tone from "tone";

let analyser: Tone.Analyser | null = null;

// 마스터 출력을 가로채는 파형 분석기. 오디오 엔진(쓰기)과 비주얼라이저(읽기)가 공유하는 단일 인스턴스.
export function getAnalyser(): Tone.Analyser {
  if (!analyser) {
    analyser = new Tone.Analyser("waveform", 512);
    analyser.toDestination(); // 분석 후 스피커로 통과
  }
  return analyser;
}
