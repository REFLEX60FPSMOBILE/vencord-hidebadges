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
│   │