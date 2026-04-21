# Daniel Prosi Academic Website
 
This repository contains a lightweight custom Jekyll site for GitHub Pages. Layout and shared chrome live in HTML templates, while the text-heavy content stays in Markdown files and collection items.

## Project structure

- `_layouts/`: Shared HTML layouts for the home page and standard pages.
- `_includes/`: Reusable partials such as the header, footer, social links, and Markdown snippets.
- `_data/site.yml`: Main profile, navigation, image paths, CV path, and social/contact links.
- `_research/`: One Markdown file per working paper.
- `_policy/`: One Markdown file per policy piece.
- `assets/css/main.css`: Site styling.
- `assets/js/main.js`: Minimal mobile-navigation JavaScript.
- `index.md`, `research.md`, `policy-work.md`, `cv.md`: Main site pages.
- `papers/`: PDF files for research papers.
- `images/`: Hero image and any future site images.
- `files/`: Existing assets already in the repository, including the current profile image, icons, and CV PDF.

## Local preview

1. Make sure Ruby and Bundler are installed.
2. Install dependencies:

   ```bash
   bundle install
   ```

3. Start the Jekyll development server:

   ```bash
   bundle exec jekyll serve
   ```

4. Open `http://127.0.0.1:4000/` in your browser.

## Adding a new research paper

1. Duplicate `_research/TEMPLATE.md`.
2. Rename it with a sortable filename such as `_research/03-my-new-paper.md`.
3. Update:
   - `title`
   - `pdf_path`
   - the body paragraph
4. Place the PDF in `papers/`.
5. Restart or refresh the local server.

Example:

```yaml
---
title: My New Paper
pdf_path: /papers/my-new-paper.pdf
---
Short abstract snippet goes here.
```

## Adding a policy piece

1. Duplicate `_policy/TEMPLATE.md`.
2. Rename it, for example `_policy/01-briefing-note.md`.
3. Update:
   - `title`
   - `external_url`
   - the body paragraph
4. Refresh the local site.

## Replacing PDFs

- CV PDF:
  Put the current CV at `files/CV/CV_prosi.pdf`, or update `cv_path` in `_data/site.yml` if you want to use a different location.

- Research PDFs:
  Put each working paper PDF in `papers/` and make sure the matching `pdf_path` in the corresponding `_research/*.md` file is correct.

## Adding embedded video or social content on the About page

The embed-ready sections are defined in `_layouts/home.html`.

- For YouTube or talk videos:
  Add a responsive embed inside the `Video Highlights` section.

- For X links or post embeds:
  Add cards or embed markup inside the `Social and Commentary` section.

- For LinkedIn articles or essays:
  Add cards or embeds inside the `Applied Writing` section.

Keep third-party scripts minimal. If you add embeds later, isolate them to those sections so a stricter Content Security Policy is easier to add.

## Publishing to GitHub Pages

### If this repo is your user site

Because the repository is named `prosidecon.github.io`, GitHub Pages can publish it as a user site.

1. Push the repository to GitHub.
2. On GitHub, open `Settings` -> `Pages`.
3. Under `Build and deployment`, choose `Deploy from a branch`.
4. Select the `main` branch and `/ (root)` folder.
5. Save the settings.

GitHub Pages will build the Jekyll site automatically.

### If you prefer GitHub Actions later

You can switch the Pages source to GitHub Actions, but this project does not require that to work.

## Connecting a custom domain later

When you are ready to use `danielprosi.com`:

1. Copy `CNAME.example` to a file named `CNAME` in the repository root.
2. Make sure the `CNAME` file contains exactly:

   ```text
   danielprosi.com
   ```

3. Commit and push the new `CNAME` file.
4. In GitHub `Settings` -> `Pages`, confirm the custom domain is set to `danielprosi.com`.
5. Update your DNS records at your domain registrar:
   - Use the GitHub Pages A records for the apex domain.
   - Add a `www` CNAME record that points to `prosidecon.github.io`.
6. Wait for DNS and certificate provisioning.
7. Enable `Enforce HTTPS` in GitHub Pages once it becomes available.

## Notes for future editing

- Keep shared layout changes in `_layouts/` and `_includes/`.
- Keep text-heavy content in Markdown whenever possible.
- Avoid adding unnecessary JavaScript or third-party scripts unless you truly need them.
