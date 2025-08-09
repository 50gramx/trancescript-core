# Project Governance

## Roles
- Maintainers: Review/merge PRs, publish releases, enforce policies
- Contributors: Open issues/PRs, propose improvements

## Decision Making
- Small changes: Maintainer approval in PR reviews
- Significant changes (features/architecture): Proposal issue → consensus via discussion → PR

## Contributions
- Fork the repo and open PRs to main
- Follow the Code of Conduct
- Link issues in PR descriptions
- Write clear commit messages and keep diffs focused

## Releases
- Automated via GitHub Actions (Pages). Tag-based workflows may be added later.

## Security & Compliance
- Follow SECURITY.md for reporting
- No secrets committed; config injected at deploy-time (see README and METRICS_SETUP.md)
