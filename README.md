# Nederlandse Spellen

A simple web application to learn Dutch through fun games.

## Features

- **Guess the Word**: Translate Dutch nouns to English
- Multiple difficulty levels (Easy/Hard)
- Customizable game duration
- Score tracking and results review

## Tech Stack

- React 18
- React Router v6
- Tailwind CSS (via CDN)
- Vite (build tool)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

This project is configured for GitHub Pages deployment.

### Setting up GitHub Pages

1. **Push your code to GitHub** (if you haven't already):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/nederlandse-spellen.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

3. **Automatic Deployment**:
   - The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically build and deploy your site on every push to the `main` branch
   - Your site will be available at: `https://YOUR_USERNAME.github.io/nederlandse-spellen/`

### Manual Deployment (Alternative)

If you prefer to deploy manually using the `gh-pages` package:

```bash
npm install --save-dev gh-pages
```

Then add to `package.json`:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

And run:
```bash
npm run deploy
```

## Word Lists

Word lists are stored in separate JSON files:
- `src/data/easy.json` - Easy difficulty words
- `src/data/hard.json` - Hard difficulty words

Each word object should have:
- `dutch`: The Dutch word (e.g., "boek")
- `english`: The English translation
- `article`: The Dutch article ("de" or "het")

