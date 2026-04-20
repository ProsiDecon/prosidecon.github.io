# Local Setup Notes

## What happened

This site itself was mostly fine. The main problems came from the local Ruby/Jekyll toolchain on Windows:

1. The original project used the `github-pages` gem, which pulled in an older Jekyll version.
2. That older Jekyll stack did not work cleanly with the installed Ruby version (`ruby 3.4.9`).
3. After moving to a newer direct Jekyll dependency, Jekyll and Liquid still had runtime-loading problems on this Windows/Ruby setup.
4. The local preview server also needed unrestricted execution to run correctly in this environment.

In short: the website content/layout was not the main issue. The issue was the local generator/runtime stack.

## Current working local URL

When the local server is running, open:

```text
http://127.0.0.1:4000/
```

## Current local run command

From the project root:

```powershell
bundle exec jekyll serve --baseurl="" --host 127.0.0.1 --port 4000
```

## Important note about the current working state

The current local setup was made to work, but it is not yet the most robust long-term solution.

Why:

- The project was moved from `github-pages` to direct `jekyll` in `Gemfile`.
- Bundler was configured locally so the project can install gems into the repository.
- Vendored gem files under `vendor/bundle` were patched locally to work around Windows/Ruby loading issues.

That means:

- the project currently works locally
- but if `vendor/bundle` is deleted and reinstalled, those gem patches may need to be redone

## Robust long-term recommendation

The best durable setup is:

1. Use a Ruby version that is well-supported by the Jekyll version you choose.
2. Use direct `jekyll` for local development instead of relying on the old `github-pages` gem bundle.
3. Prefer a pinned, explicit deployment workflow, ideally GitHub Actions, so local and deployed environments are easier to keep aligned.

## Files changed during debugging

- `Gemfile`
- `Gemfile.lock`
- `_config.yml`
- `.bundle/config`
- `vendor/bundle/.../jekyll.rb`
- `vendor/bundle/.../jekyll/filters.rb`
- `vendor/bundle/.../liquid.rb`

## Why `_config.yml` was adjusted

The very deep unused folder under:

```text
files/images/icons/ORCID Outreach Resources
```

was excluded from Jekyll processing to reduce Windows path-length trouble during builds.

## If local preview breaks again

Check these first:

1. `ruby -v`
2. `bundle -v`
3. `bundle install`
4. `bundle exec jekyll build`
5. `bundle exec jekyll serve --baseurl="" --host 127.0.0.1 --port 4000`

If the site builds but does not serve, the problem may be the local runtime environment rather than the site files.
