# Security Policy

## Supported Versions
The latest `main` branch deployment via GitHub Pages is the only supported build.

## Reporting a Vulnerability
- Open a private security advisory in GitHub (Security → Advisories), or
- Email the maintainers (see repository profile)

Please include:
- A clear description, impact, and reproduction steps
- A minimal proof-of-concept if applicable

We will acknowledge within 72 hours and aim to provide a mitigation or fix promptly.

## Content Security Policy (CSP) Guidance
TranceScript Core is offline-first with zero network egress by default.
- Do not include external scripts or fonts in the core build
- Metrics (Firebase) are strictly optional and gated by explicit user consent
- If you enforce CSP headers on a hosting proxy, recommended directives:
  - `default-src 'self'`
  - `script-src 'self' 'unsafe-inline'` (for the minimal consent banner inline script)
  - `connect-src 'self' https://*.firebaseio.com https://*.googleapis.com` (only if metrics are enabled)
  - `style-src 'self' 'unsafe-inline'`
  - `img-src 'self' data:`

## Zero-Network Verification
- Load the app with DevTools Network tab open
- Ensure no requests are made when consent is not granted
- Toggle “Offline” in DevTools → the app should still load and function with local data

