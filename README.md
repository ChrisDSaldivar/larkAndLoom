# Lark & Loom — GitHub Pages edition

The complete React/TypeScript component playground, including the supplied logo, textile assets, icon sampler, and interactive motion theatre. The two material study components are retained but hidden (`SHOW_MATERIAL_STUDIES = false` in `src/App.tsx`).

## Deploy from source (recommended)

1. Create a GitHub repository, for example `lark-loom-playground`.
2. Push the contents of this folder to its `main` branch, including `.github/workflows/pages.yml`.
3. Open the repository's **Settings → Pages** and choose **GitHub Actions** as the build source.
4. In **Actions**, run **Deploy GitHub Pages**, or push another commit. The completed deployment shows the live URL.

If you use a branch other than `main`, update the workflow's branch filter. GitHub Pages availability for private repositories depends on your GitHub plan; use a public repository if appropriate. A Pages deployment may be publicly accessible even when its repository is private.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

## Upload without a build workflow

A ready-to-host copy is included in `docs/`. Commit this folder to your repository, then choose **Deploy from a branch → main → /docs** under Settings → Pages. Use this instead of the Actions method. After changing source code, rebuild and replace `docs/` with the contents of `dist/`.

The asset URLs are relative, so the same build works at either a user Pages root or a repository subpath. Do not double-click index.html: serve it over HTTP. No backend, Sites runtime, API keys, or environment secrets are required. Google Fonts are the only external runtime font dependency; system fallbacks are provided.

## Assets and behavior

- Brand artwork and product photography supplied for this project; no additional redistribution license is granted by this export.
- Real material maps from Poly Haven are CC0; source metadata is in `public/materials/real/sources.json`.
- Some retained experimental material assets were AI-generated.
- This is a component prototype: cart state is local to the current page session, and no checkout or payment is implemented.
- The original hosted Site is not modified by this export.
