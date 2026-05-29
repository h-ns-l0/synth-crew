import { useState } from "react";
import Stage from "../components/stage/Stage";
import SoundPalette from "../components/palette/SoundPalette";
import Controls from "../components/controls/Controls";

export default function StagePage() {
  // 팔레트에서 고른 사운드 = "다음에 슬롯을 누르면 놓을 것". 무대에만 쓰는 UI 상태라 전역 대신 지역 state.
  const [selectedSoundId, setSelectedSoundId] = useState<string | null>(null);

  return (
    <div style={{ padding: 16 }}>
      <h1>SYNTH CREW</h1>
      <SoundPalette
        selectedId={selectedSoundId}
        onSelect={(id) => setSelectedSoundId((cur) => (cur === id ? null : id))}
      />
      <Controls />
      <Stage selectedSoundId={selectedSoundId} />
    </div>
  );
}
