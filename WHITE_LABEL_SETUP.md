# White-Label Setup Guide

Launch your own therapy practice website in 15 minutes. This template gives you a professional, multilingual website with a full content management system.

## What You'll Get

- Professional therapy practice website
- Multilingual support (Greek/English)
- Blog with categories and authors
- Services/therapy offerings pages
- Contact form with Netlify Forms
- Full CMS (Sanity Studio) at `/studio`
- SEO optimization built-in
- Mobile-responsive design

---

## Quick Start (3 Steps)

### Step 1: Create Your Sanity Project

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Click **"Create new project"**
3. Name your project (e.g., "My Therapy Practice")
4. Choose the **Free** plan (generous limits)
5. Select **"production"** as your dataset name
6. Note down your **Project ID** (you'll need this)

**Generate API Token:**
1. In your Sanity project, go to **API** → **Tokens**
2. Click **"Add API token"**
3. Name it "Read Token"
4. Set permissions to **"Viewer"**
5. Copy and save the token

### Step 2: Deploy to Netlify

Click the button below to deploy your site:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/[your-username]/[your-repo])

During deployment, you'll be asked for these environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID | `abc123xyz` |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API version | `2025-01-01` |
| `SANITY_API_READ_TOKEN` | The viewer token you created | `sk...` |
| `SANITY_DRAFT_SECRET` | Any random string for draft mode | `my-secret-123` |
| `SANITY_WEBHOOK_SECRET` | Any random string for webhooks | `webhook-secret-456` |
| `NEXT_PUBLIC_SITE_URL` | Your site URL (update after deploy) | `https://yoursite.netlify.app` |

### Step 3: Add Your Content

1. Go to `https://yoursite.netlify.app/studio`
2. Sign in with your Sanity account
3. Start adding your content:
   - **Site Settings**: Logo, contact info, navigation
   - **Pages**: Home, About, Contact
   - **Services**: Your therapy offerings
   - **Blog Posts**: Articles and insights

---

## Customization Guide

### Changing Your Brand Color

The site uses the **Radix UI color system**. The default accent color is **teal**. Here's how to change it to match your brand.

#### Step-by-Step (Using GitHub's Web Editor)

1. **Go to your GitHub repository** (the one created when you deployed)

2. **Navigate to the color file:**
   - Click on `app` folder
   - Click on `globals.css`

3. **Click the pencil icon** (top right) to edit the file

4. **Find these lines** (near the top of the file):
   ```css
   @import '@radix-ui/colors/teal.css';
   @import '@radix-ui/colors/teal-alpha.css';
   ```

5. **Replace `teal` with your chosen color** (see color list below):
   ```css
   @import '@radix-ui/colors/blue.css';
   @import '@radix-ui/colors/blue-alpha.css';
   ```

6. **Find the `:root` section** and update these variables:
   ```css
   /* BEFORE (teal) */
   --accent-hover: var(--teal-10);
   --accent-subtle: var(--teal-3);
   --primary: var(--teal-9);
   --accent: var(--teal-4);
   --ring: var(--teal-9);

   /* AFTER (blue) */
   --accent-hover: var(--blue-10);
   --accent-subtle: var(--blue-3);
   --primary: var(--blue-9);
   --accent: var(--blue-4);
   --ring: var(--blue-9);
   ```

7. **Scroll down and click "Commit changes"**
   - Add a message like "Change brand color to blue"
   - Click "Commit changes"

8. **Wait 1-2 minutes** for Netlify to rebuild your site

#### Available Colors

Choose from these Radix UI colors. Replace `teal` with any of these names:

| Color | Description | Best For |
|-------|-------------|----------|
| `teal` | Blue-green (default) | Calm, professional |
| `blue` | Classic blue | Trust, stability |
| `cyan` | Light blue | Fresh, modern |
| `green` | Natural green | Growth, wellness |
| `grass` | Vibrant green | Energy, nature |
| `orange` | Warm orange | Friendly, approachable |
| `amber` | Golden yellow | Warmth, optimism |
| `purple` | Rich purple | Creativity, luxury |
| `violet` | Blue-purple | Calm, spiritual |
| `indigo` | Deep blue-purple | Depth, wisdom |
| `plum` | Muted purple | Sophistication |
| `pink` | Soft pink | Gentle, caring |
| `crimson` | Deep red-pink | Passion, energy |
| `red` | Bold red | Urgency, strength |

**Preview colors:** Visit [radix-ui.com/colors](https://www.radix-ui.com/colors) to see all colors with their full shade ranges.

#### Understanding the Number System

Radix colors use numbers 1-12 for different shades:
- **1-2**: Backgrounds (very light)
- **3-4**: Subtle backgrounds, borders
- **5-6**: Hover states, borders
- **7-8**: Solid borders
- **9**: Primary solid color (buttons, links)
- **10**: Hover state for solid colors
- **11**: Low-contrast text
- **12**: High-contrast text

The template uses:
- `9` for primary buttons and links
- `10` for hover states
- `3` for subtle backgrounds (like success messages)
- `4` for light accents

### Changing Fonts

1. Open `app/layout.tsx`
2. Modify the Google Fonts imports:

```typescript
import { Lora, Open_Sans } from 'next/font/google'

const openSans = Open_Sans({
  subsets: ['latin', 'greek'],
  variable: '--font-sans',
})

const lora = Lora({
  subsets: ['latin', 'greek'],
  variable: '--font-serif',
})
```

### Adding Languages

The template supports Greek and English. To modify:

1. Edit `lib/language.ts`:
```typescript
export const AVAILABLE_LANGUAGES = ['el', 'en'] as const
export const DEFAULT_LANGUAGE = 'el'
```

2. Update Sanity schemas in `sanity/schemaTypes/siteSettings.ts` to add new language fields

---

## Setting Up Webhooks (Auto-Refresh Content)

To make your site update automatically when you change content in Sanity:

1. In your Sanity project, go to **API** → **Webhooks**
2. Click **"Create webhook"**
3. Configure:
   - **Name**: "Netlify Revalidation"
   - **URL**: `https://yoursite.netlify.app/api/revalidate`
   - **Dataset**: `production`
   - **Trigger on**: Create, Update, Delete
   - **Secret**: Same value as `SANITY_WEBHOOK_SECRET`
4. Save the webhook

---

## Content Structure

### Site Settings (Global)
- Site title and description (multilingual)
- Logo
- Contact information (email, phone, address)
- Navigation menu
- Footer links
- Booking button
- Default SEO settings

### Pages
Each page can have multiple sections:
- **Hero**: Large header with image and CTA
- **Headline**: Section title with optional subtitle
- **Rich Text**: Formatted content with images
- **Features**: Grid of features/benefits
- **Testimonials**: Client testimonials
- **CTA Banner**: Call-to-action section
- **Contact Form**: Contact form with Netlify Forms

### Blog Posts
- Title, excerpt, cover image
- Author with photo and bio
- Categories
- Rich text body with images
- SEO settings

### Therapy Offerings
- Service details
- Session information (duration, format, fees)
- FAQs
- Call-to-action

---

## Troubleshooting

### Site shows "No data" or blank pages
- Check that your Sanity project ID is correct
- Verify the API token has "Viewer" permissions
- Make sure you've published content in Sanity (not just saved as draft)

### Contact form not working
- Netlify Forms are automatically enabled
- Check Netlify dashboard → Forms to see submissions
- Ensure the form has `data-netlify="true"` attribute

### Changes not appearing on site
- Content updates may take up to 60 seconds (ISR cache)
- Set up webhooks for instant updates
- Try draft mode: `/api/draft?secret=YOUR_SECRET&slug=page-slug`

### Studio not loading
- Make sure you're logged into Sanity
- Check browser console for errors
- Verify CORS settings in Sanity project allow your domain

### Draft mode not working
- Check `SANITY_API_READ_TOKEN` is set and has read permissions
- Check `SANITY_DRAFT_SECRET` matches the secret in your URL
- Verify token is valid in Sanity → API → Tokens

### Webhook not triggering
- Check webhook URL is correct (https, not http)
- Verify `SANITY_WEBHOOK_SECRET` matches in both Sanity and Netlify
- Check Netlify function logs for errors
- Test webhook manually in Sanity webhook settings

### Build failing
- Run `pnpm build` locally to check for errors
- Ensure all environment variables are set in Netlify

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/[your-username]/[your-repo].git
cd [your-repo]

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
pnpm dev
```

Visit `http://localhost:3000` for the site and `http://localhost:3000/studio` for Sanity Studio.

---

## Support

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Netlify Documentation](https://docs.netlify.com)

For issues with this template, please open an issue on GitHub.
