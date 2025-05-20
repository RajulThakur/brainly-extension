# Linkcaddy Chrome Extension

A Chrome extension for saving and organizing your bookmarks with categories like tweets, links, videos, and documents.

## Features

- Quick bookmark saving from any webpage
- Categorize bookmarks into different types
- Save with one click
- Authenticated access to your bookmarks
- Clean and intuitive interface

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/linkcaddy-extension.git
cd linkcaddy-extension
```

2. Open Chrome and navigate to extensions:

   - Type `chrome://extensions` in the address bar
   - Or go to Menu → More Tools → Extensions

3. Enable Developer Mode:

   - Toggle the "Developer mode" switch in the top-right corner

4. Load the extension:
   - Click "Load unpacked"
   - Select the `linkcaddy-extension` directory

## Usage

1. Click the Linkcaddy icon in your Chrome toolbar
2. Login or create an account
3. The current page URL will be automatically populated
4. Click on a category to save the link
5. Your bookmark will be saved and accessible on the Linkcaddy web app

## Development

Required permissions in manifest.json:

```json
{
  "permissions": ["activeTab", "tabs", "scripting", "storage"]
}
```

## File Structure

```
linkcaddy-extension/
├── manifest.json
├── index.html
├── styles/
│   ├── styles.css
│   └── login.css
├── scripts/
│   ├── popup.js
│   └── helper/
│       └── sendRequest.js
└── public/
    └── icons/
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

MIT License
