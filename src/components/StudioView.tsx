import { useState } from "react";
import {
  IconMusic,
  IconRepeat,
  IconWaveSine,
  IconGripVertical,
} from "@tabler/icons-react";
import { useStudio } from "../hooks/useStudio";
import SoundPalette from "./palette/SoundPalette";
import Controls from "./controls/Controls";
import Stage from "./stage/Stage";
import styles from "./StudioView.module.css";

// 무대 화면 한 벌(헤더 + 무대 + 팔레트 + 컨트롤). StagePage와 JamPage가 공유한다.
export default function StudioView() {
  const { state } = useStudio();
  const [selectedSoundId, setSelectedSoundId] = useState<string | null>(null);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <IconMusic size={16} />
          </div>
          <p className={styles.title}>
            SYNTH CREW <span className={styles.titleMuted}>· 작업명</span>
          </p>
        </div>
        <span className={styles.meta}>
          <IconRepeat size={14} />
          {state.transport.bpm} BPM · 4 bars
        </span>
      </div>

      <Stage selectedSoundId={selectedSoundId} />

      <p className={styles.caption}>
        <IconWaveSine size={13} />
        막대는 활성 사운드에 맞춰 실시간으로 움직임
      </p>

      <p className={styles.paletteLabel}>
        <IconGripVertical size={15} />
        사운드 팔레트 · 눌러서 무대에 배치
      </p>
      <div className={styles.paletteWrap}>
        <SoundPalette
          selectedId={selectedSoundId}
          onSelect={(id) => setSelectedSoundId((cur) => (cur === id ? null : id))}
        />
      </div>

      <Controls />
    </div>
  );
}
