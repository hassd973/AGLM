# A Grief Like Mine Brand Site

This repository hosts a static site used to share logo options and brand colors for **A Grief Like Mine**.

## Local development

Open `frontend/index.html` to view the full interactive brand kit.
Open `brand-guide.html` for a concise logo/color overview suitable for client review.

## Updates

- Social templates now accept uploaded photos or recorded videos up to 60 seconds, let you overlay AGLM logos and custom text, support multiple aspect ratios, and export images or videos with overlays.
- The photo tool's camera can cycle through brand colors with an overlay to help match the shooting environment.

## Deploying on Render

1. Push this repository to GitHub.
2. Sign in to [Render](https://render.com) and create a **Web Service** using the Node environment.
3. Connect the service to your GitHub repo and select the `main` branch.
4. Set **Build Command** to `npm install`.
5. Set **Start Command** to `npm start`.
6. Click **Create Web Service**.

Render will install dependencies, run the start command, and serve the site from the `frontend/` directory. Subsequent pushes to `main` trigger automatic redeploys.

## Assets

SVG logos live in `assets/`:

- `assets/logo-top-1.svg` – primary logo (Top Choice 1)
- `assets/logo-top-2.svg` – top choice 2
- `assets/logo-top-3.svg` – top choice 3
- `assets/logo-alt-bg.svg` – alternate logo with background
- `assets/logo-alt-kinetic.svg` – kinetic typography alternate

## Brand colors

Color swatches in the guide are sourced from `assets/logo-top-1.svg` to maintain palette consistency.
