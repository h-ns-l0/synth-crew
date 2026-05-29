import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { StudioProvider } from "./context/StudioProvider";
import styles from "./App.module.css";
import AudioEngine from "./components/AudioEngine";
import StagePage from "./routes/StagePage";
import PresetsPage from "./routes/PresetsPage";
import JamPage from "./routes/JamPage";
import AboutPage from "./routes/AboutPage";

export default function App() {
  return (
    <StudioProvider>
      <AudioEngine />
      <BrowserRouter>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Stage
          </NavLink>
          <NavLink
            to="/presets"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Presets
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            About
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<StagePage />} />
          <Route path="/presets" element={<PresetsPage />} />
          <Route path="/jam/:code" element={<JamPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </StudioProvider>
  );
}