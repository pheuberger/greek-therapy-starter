# CLAUDE.md

White-label therapy website template. Next.js 16 + Sanity CMS + Netlify.

## Commands

```bash
pnpm dev      # localhost:3000 (site) and /studio (CMS)
pnpm build    # production build
```

## Non-Obvious Details

**Visual editing only works in development mode**, not draft mode. Check `app/layout.tsx:51` and `sanity/lib/client.ts:6` - both check `NODE_ENV === 'development'`.

**CDN is disabled** in `sanity/lib/client.ts` because ISR + tag-based revalidation requires direct API access.

**Adding a new page section:**
1. Create schema in `sanity/schemaTypes/sections/`
2. Export from `sanity/schemaTypes/index.ts`
3. Add to page schema's sections array
4. Create component in `components/sections/`
5. Add case to `SectionRenderer.tsx`
6. Update `PAGE_BY_SLUG_QUERY` in `lib/queries.ts`

**Draft mode flow:** `/api/draft?secret=SECRET&slug=SLUG` enables it, `/api/disable-draft` disables it. The `sanityFetch` wrapper auto-detects draft mode and switches clients.

**Revalidation tags:** `site`, `page`, `post`, `therapyOffering`, plus individual slug tags. Webhook at `/api/revalidate`.
