import { useState } from "react";
import SoundPalette from "./palette/SoundPalette";
import Controls from "./controls/Controls";
import Visualizer from "./visualizer/Visualizer";
import Stage from "./stage/Stage";

// 무대 화면 한 벌(팔레트 + 컨트롤 + 비주얼라이저 + 무대). StagePage와 JamPage가 공유한다.
export default function StudioView() {
  const [selectedSoundId, setSelectedSoundId] = useState<string | null>(null);

  return (
    <>
      <SoundPalette
        selectedId={selectedSoundId}
        onSelect={(id) => setSelectedSoundId((cur) => (cur === id ? null : id))}
      />
      <Controls />
      <Visualizer />
      <Stage selectedSoundId={selectedSoundId} />
    </>
  );
}
