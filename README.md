Portfolio — Local run & deploy

Quick commands

- Install deps:

```bash
npm install
```

- Run dev server:

```bash
npm run dev
```

- Build for production:

```bash
npm run build
npm run preview
```

What I updated

- Imported LinkedIn copy into `src/components/About.jsx`.
- Added expanded `Experience` details in `src/components/Experience.jsx`.
- Replaced placeholder projects with your real projects and live links in `src/components/Projects.jsx`.
- Updated `Hero` and `Contact` links to your GitHub / LinkedIn / LeetCode in `src/components/Hero.jsx` and `src/components/Contact.jsx`.
- Added `Achievements` section and updated navigation.
- Polished project card styles in `src/index.css`.

Next steps — I need from you

- Your preferred contact email (so I can replace `pankaj@example.com`).
- GitHub repository URLs for each project (RAG Intelligence, FeedLink, Delhi TrafficAI) if you want the "GitHub" buttons to link to the repo pages.

Deployment

I can deploy this to Vercel for you if you grant access (or I can provide the steps). To deploy manually:

1. Create a Vercel account and connect your GitHub repository.
2. Push this project to GitHub.
3. In Vercel, import the repo and accept the default `Vite` settings.
4. Set environment variables (if any) in Vercel dashboard.

I can help push to GitHub and connect to Vercel if you want — tell me whether to proceed and provide the repo details or give me permission to create a repo under your account.

Local resume build

I added a LaTeX resume at `resume.tex`. To compile it locally you can run (requires a TeX distribution like TeX Live or MikTeX):

```bash
pdflatex resume.tex
```

If you prefer an automated GitHub Action to build PDFs, I can add that next.
