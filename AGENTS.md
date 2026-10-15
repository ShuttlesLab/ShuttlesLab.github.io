# AGENTS.md

Guidance for AI agents working in this repository.

## Project overview

ShuttlesLab official website: a static, **English-only** single-page site hosted on
GitHub Pages (repository name `ShuttlesLab.github.io`).

- `index.html` — the single page (Hero, About, Research, News, Members, Join, Contact)
- `assets/css/style.css` — site styles
- `assets/js/main.js` — injects the navigation bar and footer, scroll-spy
- `assets/img/` — logos and member avatars
- `tools/make_avatars.py` — helper script to generate member avatars

There is no build step; editing files and pushing is enough to deploy.

## Git workflow — IMPORTANT

- **Never run `git push` without explicit approval from the user.** After committing
  (or after preparing the changes), stop and ask for confirmation before pushing to
  the remote. Wait for a clear yes before every push.
- Do not force-push, rewrite history, or delete branches/tags without explicit approval.
- Keep commits focused, and write clear commit messages in English.
- Remote used for pushing: `git@github.com:ShuttlesLab/ShuttlesLab.github.io.git` (SSH).

## Content rules

- The website must stay **English-only**; do not reintroduce Chinese text or the old
  bilingual (`data-zh` / `data-en`) language toggle.
