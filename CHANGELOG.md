# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- Corrected repository URLs in `package.json` (was pointing to non-existent `shoyz-tools` repo)
- Fixed TypeScript path resolution for `@types` bare imports
- Added missing ESLint React plugins to `devDependencies`
- Completed LICENSE file with full GPL-3.0 license text
- Fixed build/inject/dev scripts in package.json to align with Vencord userplugin workflow

### Added
- Unit testing infrastructure with Vitest
- Characterization tests for utility functions
- Issue templates (bug report, feature request)
- Pull request template with checklist
- CONTRIBUTING.md with development guidelines
- CHANGELOG.md for tracking changes
- Test scripts in package.json

### Changed
- Updated README installation instructions with correct repository name
- Clarified OSINT legal notice to avoid unverifiable compliance claims

## [1.0.0] - 2024

### Added
- Initial release of Shoyz Tools
- Badge management with visual preview
- Per-server configuration
- UI customization (themes, compact mode, custom CSS)
- Moderation tools with regex filtering
- OSINT capabilities (user lookup, server analysis, message scanner)
- Quick actions panel
- Export/Import configuration
- Keyboard shortcuts

[Unreleased]: https://github.com/REFLEX60FPSMOBILE/vencord-hidebadges/compare/v1.0.0...HEAD
