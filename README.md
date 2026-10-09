# Shoyz Tools - Comprehensive Discord Tool Suite

![Vencord Plugin](https://img.shields.io/badge/Vencord-Plugin-blue?style=for-the-badge&logo=discord)
![Version](https://img.shields.io/badge/Version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-GPL--3.0--or--later-orange?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=for-the-badge&logo=typescript)

**Shoyz Tools** is a comprehensive **Vencord** plugin that transforms your Discord experience. 
**More than just a badge hider, it's an all-in-one tool suite** for customization, moderation, OSINT, and productivity.

📖 **[Lire en français](README.fr.md)**

## OSINT Features

Shoyz Tools includes powerful OSINT (Open Source Intelligence) capabilities inspired by Void-Tools, designed for educational purposes and public data analysis only.

### User Intelligence
- Full name and username display
- Discord ID tracking
- Account creation date and age
- Nitro status and badges
- Mutual servers and friends count
- Threat scoring system (0-10 scale)

### Server Analysis
- Member count and online status
- Channel and role analysis
- Security risk assessment
- NSFW level detection
- Verification level analysis
- Suspicious activity indicators

### Message Scanning
- Link extraction and safety analysis
- Email address detection
- Phone number identification
- Discord invite tracking
- Shortened URL warnings
- Threat assessment for each finding

---

## All Features

### Badge Management
- **Visual Profile Preview**: Click on badges to hide/show them instantly
- **Automatic Detection**: Detects Discord, Vencord, and custom badges
- **Graphical Interface**: Preview badge icons before hiding
- **Search & Filter**: Find badges by name or category
- **Selective Hiding**: Hide specific badges or all at once
- **Auto-Scan**: Automatically detects new badges
- **Reset**: Clear badge catalog and start fresh

### Per-Server Settings
- **Unique Customization**: Different settings for each server
- **Server-Specific Badge Hiding**: Override global settings per server
- **Complete Management**: Full control from the "Per Server" tab
- **Quick Switching**: Easily switch between server configurations

### UI Customization
- **Preset Themes**: Dark, Light, Green, Red, and more
- **Custom Theme**: Create your own color scheme
- **Hide Message Timestamps**: Clean up your chat view
- **Hide User Avatars**: Focus on the content
- **Compact Mode**: Reduce spacing for more messages
- **Custom CSS**: Advanced modifications with your own CSS

### Moderation Tools
- **Regex Filters**: Powerful pattern matching
- **Auto-Actions**: Hide, Warn, or Block messages
- **Real-Time Stats**: Track moderation activity
- **Rule Management**: Enable/disable rules as needed
- **Stats Reset**: Clear moderation statistics

### Quick Actions
- **Toggle Badges**: One-click badge visibility
- **Toggle Avatars**: Quick avatar visibility
- **Toggle Timestamps**: Instant timestamp control
- **Compact Mode**: Toggle spacing mode
- **Clear Cache**: Remove cached badge data
- **Scan Badges**: Detect new badges

### Export/Import
- **Full Backup**: Save all your settings
- **Share**: Export configurations to share with friends
- **Sync**: Transfer settings between devices
- **JSON Format**: Complete configuration format

### Keyboard Shortcuts
- **Ctrl + B**: Toggle badges
- **Ctrl + U**: Toggle custom UI
- **Ctrl + Shift + S**: Scan for badges

---

## Installation

### Method 1: Git Installation (Recommended)

1. **Install Vencord** from source: [Vencord Documentation](https://docs.vencord.dev/installing/)
2. Navigate to your Vencord installation and create `src/userplugins/` if it doesn't exist
3. Clone this repository into the userplugins folder:
   ```bash
   cd src/userplugins
   git clone https://github.com/REFLEX60FPSMOBILE/vencord-hidebadges shoyz-tools
   ```
4. From the Vencord root directory, build and inject:
   ```bash
   pnpm build
   pnpm inject
   ```
5. Reload Discord (Ctrl+R)
6. Enable **Shoyz Tools** in: Settings > Vencord > Plugins

### Method 2: Manual Download

1. Download the latest code from this repository
2. Extract contents to `[vencord-root]/src/userplugins/shoyz-tools/`
3. From the Vencord root directory:
   ```bash
   pnpm build
   pnpm inject
   ```
4. Reload Discord and enable the plugin

> **Note**: This is a Vencord userplugin. It must be placed in the `userplugins` directory of your Vencord installation and built using Vencord's build system.

---

## Usage

### Visual Badge Selection

1. **Open plugin settings** (Settings > Vencord > Plugins > Shoyz Tools > Configure)
2. **Go to "My Profile" tab**
3. **Your profile displays** with all your badges
4. **Click on a badge** to hide it (becomes transparent with red X)
5. **Click again** to show it
6. **That's it!** Changes apply immediately everywhere in Discord

**Tip**: Badges you hide here are hidden on **ALL profiles** (yours AND other users).

### List Management

1. Go to the **"Badge List" tab**
2. Use **search** to find specific badges
3. **Filter by category** (Discord, Vencord, Custom)
4. **Check/uncheck** badges to hide
5. Use **"Hide All"** or **"Show All"** for quick actions

### Per-Server Settings

1. Go to the **"Per Server" tab**
2. **Add a server** with its ID
3. Configure **badges to hide** for that server
4. Toggle **global hiding** for that server

**Example**:
- On your gaming server: Hide Nitro badges
- On your art server: Show all badges
- On your friend server: Hide Hypesquad badges

### UI Customization

1. Go to the **"UI Customization" tab**
2. Choose a **preset theme** or create your own
3. Toggle options:
   - Hide timestamps
   - Hide avatars
   - Compact mode
4. Add **custom CSS** for advanced modifications

### Moderation Tools

1. Enable moderation in the **"Moderation" tab**
2. **Add rules** with regular expressions
3. Choose the **action** to perform (Hide, Warn, Block)
4. **Statistics** update automatically

**Example Rules**:
- `(http|https)://(bit\.ly|tinyurl)` -> Hide shortened links
- `(discord\.gg|discord\.com/invite)` -> Warn for invitations
- `(fuck|shit|bitch)` -> Hide profanity

### Export/Import

1. Go to the **"Export/Import" tab**
2. **Export** your settings:
   - Download JSON file
   - Copy to clipboard
3. **Import** a configuration:
   - From file
   - From clipboard

---

## Configuration

Access the full configuration interface via:
```
Discord Settings > Vencord > Plugins > Shoyz Tools > Configure
```

### Available Tabs

| Tab | Description | Added |
|-----|-------------|-------|
| My Profile | Profile preview + visual badge selection | v1.0.0 |
| Badge List | Complete list with search and filtering | v1.0.0 |
| Per Server | Server-specific settings | v1.0.0 |
| UI Customization | Themes, timestamps, avatars, CSS | v1.0.0 |
| Moderation | Auto-filtering rules | v1.0.0 |
| Quick Actions | One-click actions | v1.0.0 |
| Export/Import | Backup and restore | v1.0.0 |
| OSINT | Open Source Intelligence tools | v1.0.0 |

---

## OSINT Module

The OSINT (Open Source Intelligence) module provides educational insights into publicly available Discord data. All information displayed is already visible through Discord's official API.

### User Dossier
- **Full Name**: Display name and username
- **Discord ID**: Unique identifier
- **Account Age**: When the account was created
- **Badges**: All Discord badges
- **Mutual Servers**: Servers you share with the user
- **Mutual Friends**: Number of shared friends
- **Threat Score**: 0-10 scale based on various factors
- **Risk Indicators**: Visual warnings for suspicious accounts

### Server Security Assessment
- **Member Analysis**: Total and online members
- **Channel Breakdown**: Text, voice, and category channels
- **Role Hierarchy**: All roles with permissions
- **Security Score**: 0-10 scale based on server settings
- **Risk Factors**: Identified security concerns
- **Recommendations**: Suggestions for improving security

### Message Scanner
- **Link Extraction**: All URLs found in messages
- **Safety Analysis**: Safe/unsafe classification
- **Shortened URL Warnings**: Alerts for bit.ly, tinyurl, etc.
- **Email Detection**: Extracted email addresses
- **Phone Detection**: Extracted phone numbers
- **Invite Tracking**: Discord server invites
- **Threat Assessment**: Risk level for each finding

---

## Tips & Tricks

### For Visual Badge Selection
1. **Open a profile** (yours or a friend's) to detect badges
2. **Badges appear** in the "My Profile" tab after detection
3. **Click directly** on a badge to hide it
4. **Red X** indicates the badge is hidden
5. **Click again** to show it

### For Per-Server Settings
1. **Get server ID** from URL or Discord settings
2. **Add server** in the "Per Server" tab
3. **Configure hiding** specific to that server
4. **Settings apply automatically** when you switch servers

### For Custom CSS
- Use **F12** (Inspector) to find selectors
- Test your CSS on [CodePen](https://codepen.io/) before applying
- Example: `.message { background: rgba(255, 0, 0, 0.1) !important; }`

### For Moderation
- **Regex101** is your friend: [https://regex101.com/](https://regex101.com/)
- Test your regular expressions before adding them
- Start with simple rules, then increase complexity

---

## Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed development setup and guidelines.

### Quick Start

```bash
# Install dependencies
pnpm install

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### Project Structure

```
.
├── src/
│   ├── index.tsx              # Plugin entry point
│   ├── components/            # React components
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   ├── styles/                # Styling utilities
│   └── assets/                # Static assets
├── tests/                     # Test files
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

## Reporting Bugs

Found a bug? Please use our [bug report template](.github/ISSUE_TEMPLATE/bug_report.yml) to report it.

---

## Legal Notice

**IMPORTANT**: This plugin is designed for educational and personal customization purposes only.

- All data displayed is **publicly available** through Discord's official API
- No **scraping** or **data collection** beyond what Discord provides
- No **private information** is accessed or stored
- OSINT features analyze only publicly visible information
- For **educational purposes only**

**Use responsibly and at your own risk.** The authors are not responsible for misuse of this software.

---

## Support

- **GitHub Issues**: [https://github.com/REFLEX60FPSMOBILE/vencord-hidebadges/issues](https://github.com/REFLEX60FPSMOBILE/vencord-hidebadges/issues)
- **Vencord Documentation**: [https://docs.vencord.dev](https://docs.vencord.dev)

---

## Credits

- **Vencord Team** for this amazing project
- **Void-Tools** for OSINT presentation inspiration
- All contributors and testers
- The Discord community for support
- **YOU** for using this plugin!

---

## License

This project is licensed under the GNU General Public License v3.0 or later - see the [LICENSE](LICENSE) file for details.

---

**Shoyz Tools v1.0.0** - The ultimate Discord experience, **exactly as you want it**!

*"Because Discord deserves to be 100% personalized"*
