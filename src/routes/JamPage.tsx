import { useParams } from "react-router-dom";

export default function JamPage() {
  const { code } = useParams<{ code: string }>();
  return <h1>Jam — 공유 코드: {code}</h1>;
}