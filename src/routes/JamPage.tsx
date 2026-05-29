import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStudio } from "../hooks/useStudio";
import { decodeArrangement } from "../lib/share";
import StudioView from "../components/StudioView";

// 공유 링크(/jam/:code)로 들어오면 코드를 배치로 풀어 전역 상태에 싣는다.
export default function JamPage() {
  const { code } = useParams<{ code: string }>();
  const { dispatch } = useStudio();

  useEffect(() => {
    if (code) dispatch({ type: "LOAD", arrangement: decodeArrangement(code) });
  }, [code, dispatch]);

  return (
    <div>
      <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--color-text-secondary)" }}>
        공유받은 크루야. 그대로 재생하거나 바꿔봐.
      </p>
      <StudioView />
    </div>
  );
}
