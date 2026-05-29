import { useRef } from "react";
import { useVisualizer } from "../../hooks/useVisualizer";

// 무대 뒤 이퀄라이저: 활성 사운드들이 합쳐진 마스터 파형을 실시간으로 그린다.
export default function Visualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useVisualizer(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={120}
      style={{
        width: "100%",
        height: 120,
        display: "block",
        background: "var(--bg-panel)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        margin: "12px 0",
      }}
    />
  );
}
