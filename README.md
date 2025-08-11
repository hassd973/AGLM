# A Grief Like Mine Brand Site

This repository hosts a static site used to share logo options and brand colors for **A Grief Like Mine**.

## Local development

Open `index.html` to view the full interactive brand kit.
Open `brand-guide.html` for a concise logo/color overview suitable for client review.

## Deploying on Render

1. Push this repository to GitHub.
2. Sign in to [Render](https://render.com) and create a **Static Site**.
3. Connect the site to your GitHub repo and select the `main` branch.
4. Leave **Build Command** empty.
5. Set **Publish Directory** to `.` (the repository root).
6. Click **Create Static Site**.

Render will build and serve the site at your chosen domain. Subsequent pushes to `main` trigger automatic redeploys.

## Assets

SVG logos live in `assets/`:

- `assets/logo-top-1.svg` – primary logo (Top Choice 1)
- `assets/logo-top-2.svg` – top choice 2
- `assets/logo-top-3.svg` – top choice 3
- `assets/logo-alt-bg.svg` – alternate logo with background
- `assets/logo-alt-kinetic.svg` – kinetic typography alternate

## Brand colors

Color swatches in the guide are sourced from `assets/logo-top-1.svg` to maintain palette consistency.
