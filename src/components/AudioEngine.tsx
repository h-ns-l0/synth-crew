import { useAudioEngine } from "../hooks/useAudioEngine";

// 오디오 엔진을 앱 수명 내내 살려두는 자리. 라우터 밖에 둬서 페이지 이동에도 소리가 끊기지 않는다.
export default function AudioEngine() {
  useAudioEngine();
  return null;
}
