import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StagePage from "./routes/StagePage";
import PresetsPage from "./routes/PresetsPage";
import JamPage from "./routes/JamPage";
import AboutPage from "./routes/AboutPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: 12, padding: 12 }}>
        <Link to="/">Stage</Link>
        <Link to="/presets">Presets</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<StagePage />} />
        <Route path="/presets" element={<PresetsPage />} />
        <Route path="/jam/:code" element={<JamPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}