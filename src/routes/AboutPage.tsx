import { KEY } from "../audio/scale";

export default function AboutPage() {
  return (
    <div style={{ padding: 16, textAlign: "left", maxWidth: 640, margin: "0 auto" }}>
      <h1>About</h1>
      <p style={{ marginBottom: 16 }}>
        SYNTH CREW는 인크레디박스 방식의 "사운드 크루" 웹앱이야. 무대 위 로봇
        슬롯에 사운드를 배치하면 그 사운드가 루프로 재생되고, 활성 사운드들이
        합쳐진 파형이 무대 뒤 비주얼라이저에 실시간으로 그려져.
      </p>

      <h2>어떻게 동작해?</h2>
      <ul>
        <li>오디오 파일 없이 Tone.js로 브라우저에서 직접 신스를 합성해.</li>
        <li>모든 사운드는 하나의 Tone.Transport 그리드 위에서 돌아 자동으로 싱크돼.</li>
        <li>사운드 배치 = 해당 신스 루프를 켜기, 제거 = 끄기.</li>
        <li>멜로디는 전부 {KEY} 키로 통일돼 아무 조합이나 어울려.</li>
      </ul>

      <h2>저장 &amp; 공유</h2>
      <ul>
        <li>Presets: 만든 조합을 브라우저에 저장하고 다시 불러와.</li>
        <li>공유: 현재 배치를 URL 코드로 만들어 링크 하나로 크루를 넘겨줄 수 있어.</li>
      </ul>
    </div>
  );
}
