# Therapy Site Template

A professional, white-label website template for therapists and mental health practitioners. Built with Next.js 16, Sanity CMS, and optimized for Netlify deployment.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/[your-username]/[your-repo])

## Features

- **Professional Design** - Clean, modern design optimized for therapy practices
- **Full CMS** - Sanity Studio gives complete control over all content
- **Multilingual** - Built-in Greek and English support
- **Blog** - Full-featured blog with categories and authors
- **Service Pages** - Showcase therapy offerings with FAQs and session details
- **Contact Forms** - Netlify Forms integration (no email setup needed)
- **SEO Optimized** - Meta tags, Open Graph, and structured data
- **Mobile Responsive** - Looks great on all devices

## Quick Start

### Option 1: One-Click Deploy

1. Click the **Deploy to Netlify** button above
2. Create a Sanity project at [sanity.io/manage](https://www.sanity.io/manage)
3. Enter your Sanity credentials during Netlify setup
4. Your site is live!

See the [White Label Setup Guide](./WHITE_LABEL_SETUP.md) for detailed instructions.

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/[your-username]/[your-repo].git
cd [your-repo]

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your Sanity credentials

# Start development server
pnpm dev
```

Visit:
- `http://localhost:3000` - Website
- `http://localhost:3000/studio` - Sanity Studio

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name (usually `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API version (e.g., `2025-01-01`) |
| `SANITY_API_READ_TOKEN` | Sanity viewer token |
| `SANITY_DRAFT_SECRET` | Secret for draft mode access |
| `SANITY_WEBHOOK_SECRET` | Secret for webhook validation |
| `NEXT_PUBLIC_SITE_URL` | Your site's full URL |

## Customization

### Changing Colors

Edit `app/globals.css` and change the Radix color imports:

```css
/* Change from teal to blue */
@import "@radix-ui/colors/blue.css";
@import "@radix-ui/colors/blue-alpha.css";

:root {
  --primary: var(--blue-9);
  --accent-hover: var(--blue-10);
  --accent-subtle: var(--blue-3);
}
```

### Changing Fonts

Edit `app/layout.tsx` to use different Google Fonts.

### Adding Content

Access Sanity Studio at `/studio` to manage:
- Site settings (logo, navigation, contact info)
- Pages with modular sections
- Blog posts and categories
- Therapy service offerings

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── [[...path]]/       # Dynamic page routing
│   ├── blog/              # Blog pages
│   ├── services/          # Service pages
│   ├── studio/            # Sanity Studio
│   └── get-started/       # White-label setup landing page
├── components/            # React components
│   ├── sections/          # Page section components
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/                   # Utilities and types
│   ├── queries.ts         # GROQ queries
│   └── types.ts           # TypeScript interfaces
├── sanity/                # Sanity configuration
│   ├── schemaTypes/       # Content schemas
│   └── lib/               # Sanity utilities
└── public/                # Static assets
```

## Documentation

- [Setup Guide](./WHITE_LABEL_SETUP.md) - Complete setup instructions
- [CLAUDE.md](./CLAUDE.md) - Development notes

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [Sanity](https://www.sanity.io/) - Headless CMS
- [Tailwind CSS 4](https://tailwindcss.com/) - Styling
- [Radix UI Colors](https://www.radix-ui.com/colors) - Color system
- [Netlify](https://www.netlify.com/) - Hosting and forms

## License

MIT License - feel free to use this template for your own projects.
