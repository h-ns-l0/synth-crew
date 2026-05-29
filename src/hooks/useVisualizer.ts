import { useEffect, type RefObject } from "react";
import { getAnalyser } from "../audio/master";

// 공유 분석기의 파형을 매 프레임 캔버스에 그린다. requestAnimationFrame으로 60fps 갱신.
export function useVisualizer(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const analyser = getAnalyser();
    let raf = 0;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      const wave = analyser.getValue() as Float32Array; // -1..1
      const { width, height } = canvas;

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#c084fc";
      ctx.beginPath();
      for (let i = 0; i < wave.length; i++) {
        const x = (i / (wave.length - 1)) * width;
        const y = (0.5 - wave[i] * 0.5) * height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [canvasRef]);
}
