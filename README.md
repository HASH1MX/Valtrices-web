# Valtrices Landing Page

Marketing site for **Valtrices**, a Windows desktop app for VALORANT match tracking and statistics.
This is a separate project from the desktop application itself.

The site is plain HTML, CSS, and JavaScript with no build step, so it can be hosted anywhere
static files are served (GitHub Pages, Netlify, Cloudflare Pages, etc.).

## Structure

```
index.html        Page markup, one section per block (hero, why, features, score, how it works, download, footer)
css/styles.css    All styles. Design tokens live in :root at the top of the file.
js/main.js        Small vanilla script: link config, mobile nav, scroll reveal, active nav link
assets/           Favicon and other static assets
.claude/          Local preview server config used by the Claude desktop app
```

## Run locally

Any static file server works. With Python installed:

```bash
python -m http.server 8080
```

Then open http://localhost:8080.

## Updating the download link

The "Download Valtrices" buttons and the GitHub links are driven by the `CONFIG` object at the top of
`js/main.js`. Right now `downloadUrl` points at the site's own `riot.txt` and `downloadAsFile` is
`true`, so the buttons download that file. To switch to the Windows build later, set `downloadUrl`
to the GitHub Releases URL, set `downloadAsFile` to `false`, and update `repoUrl`. The matching
`href` and `download` attributes in `index.html` are no-JS fallbacks and should be updated to match.

## Adding a section

1. Add a `<section class="section" id="your-id">` block in `index.html` (use `section--alt` for the
   darker, bordered variant).
2. Reuse `.section__head`, `.eyebrow`, `.section__title`, and `.section__lead` for the heading block.
3. Add `class="reveal"` (optionally `data-delay="1"` or `"2"`) to elements that should fade in on scroll.
4. Add a nav link pointing at the new `id` if it should appear in the header.

## Notes

- No Riot API calls are made from the website. All numbers shown in the hero and score card are static
  illustrations.
- The legal line in the footer follows Riot's required wording for third-party projects.

## Deployment

The site is published with GitHub Pages from the `main` branch by the workflow in
`.github/workflows/deploy-pages.yml`. Every push to `main` redeploys it to:

https://hash1mx.github.io/Valtrices-web/

If a deployment ever fails with a "Pages not enabled" error, open the repository's
Settings, choose Pages, and set Source to "GitHub Actions" once.
