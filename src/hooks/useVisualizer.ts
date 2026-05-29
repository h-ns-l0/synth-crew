import { useEffect, type RefObject } from "react";
import { getAnalyser } from "../audio/master";

const BAR_COLORS = ["#D85A30", "#1D9E75", "#378ADD", "#7F77DD", "#EF9F27"];
const BARS = 24;

// 공유 분석기의 주파수 스펙트럼을 매 프레임 EQ 막대로 그린다. 활성 사운드에 맞춰 출렁인다.
export function useVisualizer(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const analyser = getAnalyser();
    let raf = 0;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      const fft = analyser.getValue() as Float32Array; // dB, 대략 -100..0
      const { width, height } = canvas;
      const gap = 3;
      const barW = (width - gap * (BARS - 1)) / BARS;
      const bin = Math.floor(fft.length / BARS);

      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 0.85;
      for (let i = 0; i < BARS; i++) {
        const db = fft[i * bin];
        const norm = Math.max(0, Math.min(1, (db + 90) / 90));
        const h = Math.max(2, norm * height);
        const x = i * (barW + gap);
        ctx.fillStyle = BAR_COLORS[i % BAR_COLORS.length];
        ctx.beginPath();
        ctx.roundRect(x, height - h, barW, h, [3, 3, 0, 0]);
        ctx.fill();
      }
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [canvasRef]);
}
