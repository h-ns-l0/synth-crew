# SYNTH CREW

로봇 크루에게 사운드를 입혀 나만의 신스 루프를 만드는 인터랙티브 음악 웹앱.

**Live Demo** · https://synth-crew-jade.vercel.app

## 소개

무대 위 로봇 퍼포머에 사운드를 배치하면 각 루프가 겹쳐 한 곡이 완성되고, 무대 뒤 비주얼라이저가 재생 중인 소리에 실시간으로 반응합니다. 모든 사운드는 오디오 파일 없이 **Tone.js로 브라우저에서 직접 합성**되며, `Tone.Transport`로 모든 루프가 박자에 자동 동기화됩니다.

## 주요 기능

- 로봇 슬롯에 사운드 배치·제거, 재생·정지·BPM 조절
- 드럼·베이스·신스·보컬 등 합성 사운드 모듈
- 재생 사운드에 반응하는 실시간 비주얼라이저 (Canvas)
- 조합 저장(localStorage) 및 URL 공유

## 기술 스택

`Vite` · `React` · `TypeScript` · `React Router v6` · `Context API + useReducer` · `Tone.js` · `Canvas / AnalyserNode` · `CSS Modules` · `Vercel`

## 설계 포인트

- **전역 상태** — 배치·재생 상태를 Context API + useReducer로 단일 진실 공급원으로 관리
- **커스텀 Hook** — `useStudio` · `useAudioEngine` · `useVisualizer`로 로직 캡슐화
- **동적 라우트** — `/jam/:code`로 조합을 URL에 인코딩해 공유
- **TypeScript** — 사운드·배치 상태를 타입화해 컴파일 단계에서 오류 차단

## 시작하기

```bash
npm install      # 의존성 설치
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 프로덕션 빌드
```

## 프로젝트 구조

```
src/
├─ routes/        # 페이지: Stage(/), Presets, Jam(/jam/:code), About
├─ components/    # UI 컴포넌트
├─ context/       # 전역 상태 (Context · Provider · Reducer)
├─ hooks/         # 커스텀 Hook
├─ audio/         # 사운드 모듈 정의
└─ types/         # 타입 정의
```

---

인덕대학교 컴퓨터소프트웨어학과 · 함한솔 · 2026