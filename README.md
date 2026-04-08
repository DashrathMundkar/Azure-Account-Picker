# Azure Account Picker — Chrome Extension

A Chrome extension that forces Microsoft/Azure login pages to always show the **"Pick an account"** screen instead of automatically signing in with a cached account.

## Problem

When you have multiple Azure/Microsoft accounts signed in to Chrome, the login flow often auto-selects the wrong account — typically the one whose credentials haven't expired yet, rather than the one you actually need.

## Solution

This extension intercepts Azure login requests and adds `prompt=select_account` to the OAuth2 URL, which forces Microsoft to display the account picker every time.

## Supported Login Domains

- `login.microsoftonline.com` (Azure AD / Microsoft Entra ID)
- `login.live.com` (Microsoft Live)
- `login.windows.net` (Legacy Azure AD)

## Installation

### From Chrome Web Store
*(Coming soon)*

### Manual (Developer Mode)
1. Clone or download this repository
2. Open Chrome → `chrome://extensions/`
3. Enable **Developer mode** (top right toggle)
4. Click **Load unpacked**
5. Select the project folder

## How It Works

The extension uses Chrome's `declarativeNetRequest` API to add the `prompt=select_account` query parameter to Microsoft OAuth2 authorization requests. This is the standard OpenID Connect parameter that tells Microsoft's identity platform to always show the account selection screen.

- No data is collected, stored, or transmitted
- No credentials or tokens are read
- No external servers are contacted
- All logic runs locally in the browser

## Files

| File | Purpose |
|------|---------|
| `manifest.json` | Extension configuration and permissions |
| `background.js` | Service worker for request interception |
| `rules.json` | Declarative net request rules |
| `popup.html` | Extension popup UI |

## Privacy

See [Privacy Policy](privacy-policy.html). This extension collects zero user data.

## License

MIT
