# Website Update Guide

This GitHub Pages site is published from the repository `docs/` folder.

## Important rule
- Treat `docs/` as the live website source.
- If a file changes in `quant-course/site/` but not in `docs/`, the public website will NOT update.

## Fastest update path
If editing on the deployment machine:

```bash
git -C /home/shuaideyipi/.openclaw/workspace add docs
git -C /home/shuaideyipi/.openclaw/workspace commit -m "Update quant website"
git -C /home/shuaideyipi/.openclaw/workspace push
```

## If editing from GitHub web UI
- Open the repository on GitHub
- Edit files directly inside the `docs/` folder
- Commit the change in GitHub
- GitHub Pages will redeploy automatically

## Cache note
The site uses versioned CSS/JS references in `docs/index.html`.
If you make major front-end changes, bump the version suffix on:
- `styles.css?v=...`
- `app.js?v=...`
This helps browsers fetch the latest files instead of showing stale cached assets.
