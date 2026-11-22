# Smart Campus Room Availability Checker — Practice 11

Practice 11 extends the existing Smart Campus checker with an optional availability explanation. One fictional room A101, simulated current time 09:00, existing booking 10:00–11:00. No booking creation, login, database, API calls or real student data. Availability depends exclusively on the unchanged `checkAvailability` function.

## Run

- Open `smart-campus-preview.html` in a browser for the standalone offline demo (the current sources transpiled with TypeScript plus the earlier React/icon runtime and CSS). No network or install required.
- For the regular Vite workflow, run `npm ci`, `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`, `npm run dev`. Node 22.16+ with type stripping or Node 24 recommended.
- `npm test` runs 16 existing and 20 new tests. `evidence/` contains actual browser screenshots and verification logs.
- Current environment could not install dependencies: full Vite build, project typecheck and ESLint are not verified. The core strict TypeScript check and offline browser verification passed.

## Feature

Check Availability -> deterministic rule engine -> structured result -> optional Explain availability -> validated mock adapter -> separately labeled explanation. The mock mode selector demonstrates timeout, API failure and missing key. Any changed form field clears the previous result and explanation. A real provider is not configured. If added later, the provider must be on a server and keep its key there.

## Publishing

Published demo: https://smart-campus-room-av-7ei5.bolt.host/. The student confirmed the available and overlapping scenarios in the published interface. This archive contains the locally tested source; exact equivalence with the published Bolt export and full build, typecheck and lint results in Bolt have not been independently verified.
