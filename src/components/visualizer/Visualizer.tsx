import { useRef } from "react";
import { useVisualizer } from "../../hooks/useVisualizer";
import styles from "./Visualizer.module.css";

// 무대 뒤 EQ 막대. 활성 사운드들의 스펙트럼을 실시간으로 그린다.
export default function Visualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useVisualizer(canvasRef);

  return <canvas ref={canvasRef} width={680} height={120} className={styles.eq} />;
}
