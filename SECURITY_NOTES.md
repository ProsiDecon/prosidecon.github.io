# Security Notes for a Static GitHub Pages Site

- Enable HTTPS in GitHub Pages and keep `Enforce HTTPS` turned on once the certificate is issued.
- Verify ownership of any custom domain and keep DNS records limited to the values GitHub Pages requires.
- Do not store secrets, API keys, tokens, or private credentials in this repository.
- Be cautious with third-party embeds such as YouTube, X, or LinkedIn widgets because they can load external scripts and trackers.
- Prefer simple external links over embeds when possible.
- If you add embeds later, keep them isolated so you can introduce a Content Security Policy more easily.
- Review uploaded PDFs and images before publishing them to make sure they do not contain sensitive metadata you do not want public.
