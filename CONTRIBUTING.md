# Contributing to Shoyz Tools

Thank you for considering contributing to Shoyz Tools! This document provides guidelines and instructions for development.

## Development Setup

### Prerequisites

- **Node.js** v16 or higher
- **pnpm** package manager
- **Vencord** installed from source: [Vencord Installation Guide](https://docs.vencord.dev/installing/)
- **Git** for version control

### Installation

1. **Fork and clone** the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/vencord-hidebadges.git
   cd vencord-hidebadges
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Install as a Vencord userplugin**:
   - Copy or symlink this directory into your Vencord installation's `src/userplugins/` folder
   - From the Vencord root directory:
     ```bash
     pnpm build
     pnpm inject
     ```

4. **Reload Discord** (Ctrl+R) and enable the plugin in Settings > Vencord > Plugins

## Development Workflow

### Code Quality Checks

Before submitting changes, ensure all checks pass:

```bash
# Type checking
pnpm typecheck

# Linting
pnpm lint

# Run tests
pnpm test

# Run tests in watch mode during development
pnpm test:watch
```

### Project Structure

```
.
├── src/
│   ├── index.tsx              # Plugin entry point
│   ├── components/            # React components
│   │   ├── SettingsPanel.tsx  # Main settings UI
│   │   ├── OSINT/             # OSINT-related components
│   │   └── ...                # Other UI components
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   ├── styles/                # Styling utilities
│   └── assets/                # Static assets (icons, etc.)
├── tests/                     # Test files
└── package.json
```

### Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Follow existing code style
- **Imports**: Use path aliases (`@components/*`, `@utils/*`, etc.)
- **React**: Functional components with hooks
- **Comments**: Add JSDoc for public functions

### Testing

We use **Vitest** for testing. Tests should:

- Cover utility functions in `src/utils/`
- Test edge cases and error handling
- Mock DOM interactions when needed
- Be placed in `tests/` directory with `.test.ts` extension

Example test:

```typescript
import { describe, it, expect } from 'vitest';
import { generateBadgeKey } from '@utils/helpers';

describe('generateBadgeKey', () => {
  it('should generate Discord badge keys', () => {
    const img = document.createElement('img');
    img.src = 'https://cdn.discordapp.com/badge-icons/test-badge.png';
    const { key, kind } = generateBadgeKey(img);
    expect(key).toBe('d:test-badge');
    expect(kind).toBe('discord');
  });
});
```

## Pull Request Process

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the code style and structure

3. **Add/update tests** for new functionality

4. **Run all checks**:
   ```bash
   pnpm typecheck && pnpm lint && pnpm test
   ```

5. **Commit** with clear, descriptive messages:
   ```bash
   git commit -m "feat: add new badge detection for X"
   ```

6. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request** on GitHub:
   - Use the PR template
   - Fill in all sections
   - Link related issues
   - Wait for review

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## Bug Reports

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.yml) and include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Vencord and Discord versions
- Operating system and browser

## Feature Requests

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.yml) and explain:

- The problem or use case
- Your proposed solution
- Any alternatives considered
- Additional context

## Code of Conduct

- Be respectful and professional
- Welcome newcomers
- Provide constructive feedback
- Focus on the code, not the person

## Questions?

- Check the [README](README.md) first
- Search [existing issues](https://github.com/REFLEX60FPSMOBILE/vencord-hidebadges/issues)
- Open a new issue with the `question` label

## License

By contributing, you agree that your contributions will be licensed under the GPL-3.0-or-later license.

---

Thank you for contributing to Shoyz Tools! 🎉
