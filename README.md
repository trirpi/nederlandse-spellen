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

This project is configured for Netlify deployment. Simply connect your repository to Netlify and it will automatically build and deploy.

The `netlify.toml` file configures:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA routing redirects

## Word Lists

Word lists are stored in `src/data/wordLists.json`. You can add more words to the `easy` and `hard` arrays. Each word object should have:
- `dutch`: The Dutch word with article (e.g., "het boek")
- `english`: The English translation
- `article`: The Dutch article ("de" or "het")

