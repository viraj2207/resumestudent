# ResumeBuilder

Student resume builder with 15 templates, live editor, ATS scorer, and PDF download — built with pure vanilla JS + Vite.

## Run & Operate

- `pnpm --filter @workspace/resume-builder run dev` — start the resume builder (served via workflow)
- No env vars required for the front-end artifact.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **Frontend**: Vanilla JS ES modules, no framework
- **Build tool**: Vite (vite.config.ts)
- **Styles**: Single `src/app.css` (~1800 lines, includes all template + page styles)
- **API framework**: Express 5 (api-server artifact, separate)
- **Database**: PostgreSQL + Drizzle ORM (api-server only)

## Where things live

```
artifacts/resume-builder/src/
├── main.js                  # Slim entrypoint: imports all pages, calls initRouter + render()
├── app.css                  # All styles — do not split
├── router.js                # navigate(), initRouter(renderFn)
├── state.js                 # Mutable global state object
├── data/config.js           # TEMPLATES array, SKILL_LEVELS, SAMPLE_RESUME
├── utils/helpers.js         # esc(), debounce(), showToast(), skillPct(), skillDots()
├── utils/storage.js         # loadResume(), saveResume(state), loadTemplate()
├── templates/               # 15 template renderers + index.js (getResumeHTML switch)
└── pages/                   # home.js, templates.js, editor.js, preview.js, ats.js
```

## Architecture decisions

- Pure vanilla JS + ES modules — no React, no framework, by design for simplicity/speed.
- Single `app.css` intentionally kept monolithic — all resume template styles are co-located.
- Router uses `initRouter(renderFn)` pattern to avoid circular imports; `navigate()` calls stored `_render` ref.
- `saveResume(state)` takes state as argument (not a global) to keep storage.js side-effect free.
- PDF download uses `window.print()` + `@media print` CSS with a hidden `#print-area` div.
- localStorage keys: `rb_resume_v2` (resume data), `rb_template` (selected template id).

## Product

- Home page with navigation cards and footer: "Designed by Viraj Khandare © RESUMEBUILDER 1.7.3"
- 15 resume templates (classic, modern, creative, minimal, executive, techpro, bold, academic, startup, corporate, gradient, compact, elegant, dark, twotone)
- Resume editor with live preview, 6 sections (personal, experience, education, skills, projects, certifications), auto-save to localStorage
- ATS Score Tester with real-time 0–100 scoring, category breakdown, improvement tips, and job description keyword matcher
- One-click PDF download via browser print dialog

## User preferences

- Footer "Designed by Viraj Khandare © RESUMEBUILDER 1.7.3" appears only on the home page.
- Code must be organized into proper separate files/folders — not monolithic.

## Gotchas

- Do NOT add leaf workspace packages to root `tsconfig.json` references.
- Do NOT run `pnpm dev` at workspace root — use `restart_workflow` instead.
- The `src/components/ui/` folder contains unused scaffold files; the app uses only the files under `src/data/`, `src/utils/`, `src/templates/`, and `src/pages/`.
