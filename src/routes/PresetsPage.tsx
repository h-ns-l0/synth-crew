import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudio } from "../hooks/useStudio";
import { usePresets } from "../hooks/usePresets";
import { getSound } from "../audio/sounds";

export default function PresetsPage() {
  const { state, dispatch } = useStudio();
  const { presets, save, remove } = usePresets();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) return;
    save(trimmed, state.arrangement);
    setName("");
  }

  function summary(arrangement: (string | null)[]) {
    const labels = arrangement
      .filter((id): id is string => id !== null)
      .map((id) => getSound(id)?.label ?? id);
    return labels.length ? labels.join(", ") : "(빈 무대)";
  }

  return (
    <div style={{ padding: 16, textAlign: "left", maxWidth: 600, margin: "0 auto" }}>
      <h1>Presets</h1>

      <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="현재 무대를 저장할 이름"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="button" onClick={handleSave}>
          현재 조합 저장
        </button>
      </div>

      {presets.length === 0 ? (
        <p>저장된 조합이 없어. 무대에서 만든 뒤 여기서 저장해봐.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {presets.map((preset) => (
            <li
              key={preset.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div style={{ flex: 1 }}>
                <strong>{preset.name}</strong>
                <div style={{ fontSize: 13 }}>{summary(preset.arrangement)}</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: "LOAD", arrangement: preset.arrangement });
                  navigate("/");
                }}
              >
                불러오기
              </button>
              <button type="button" onClick={() => remove(preset.name)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
