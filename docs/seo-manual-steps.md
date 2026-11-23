# SEO manual steps (Phase 2)

These sit outside the repo. Do them after the Phase 2 preview looks right.

## Vercel

- [ ] Set `NEXT_PUBLIC_SITE_URL` to `https://www.suppliedpackaging.com` for **Production** and **Preview**, then redeploy.
- [ ] Confirm `supplied.agency` and `www.supplied.agency` 308 redirect to `https://www.suppliedpackaging.com`.

The app also 308-redirects the apex (`suppliedpackaging.com`) and any `supplied.agency` host to www, and sends `X-Robots-Tag: noindex, nofollow` on every other host. Canonicals stay on www even when that env var is missing or points somewhere else.

## Google Search Console

- [ ] Resubmit the sitemap: `https://www.suppliedpackaging.com/sitemap.xml`
- [ ] Request indexing on these product pages:
  - [ ] `https://www.suppliedpackaging.com/products/mailer-boxes`
  - [ ] `https://www.suppliedpackaging.com/products/paper-mailers`
  - [ ] `https://www.suppliedpackaging.com/products/printed-cans`
  - [ ] `https://www.suppliedpackaging.com/products/rigid-boxes`
  - [ ] `https://www.suppliedpackaging.com/products/advent-calendars`
  - [ ] `https://www.suppliedpackaging.com/products/shipping-boxes`

## Bing Webmaster Tools

- [ ] Import the site from Search Console.
- [ ] Submit `https://www.suppliedpackaging.com/sitemap.xml`.

## Rich Results Test

- [ ] Homepage: `https://www.suppliedpackaging.com/` — Organization and WebSite should validate. There is no site search box, so WebSite has no `SearchAction`.
- [ ] A product page, for example `https://www.suppliedpackaging.com/products/mailer-boxes` — BreadcrumbList should validate. Product JSON-LD is intentionally absent until Phase 4 adds a Sanity `priceGuide`. Do not expect a Product rich result yet.

## Preview checks

- [ ] View source on `/products/mailer-boxes`: one canonical to `https://www.suppliedpackaging.com/products/mailer-boxes`, one H1, a unique title, the product copy in the raw HTML, and no request for the `.glb` until “View in 3D”.
- [ ] `curl -I https://<preview>.vercel.app` includes `x-robots-tag: noindex, nofollow`.
- [ ] `/sitemap.xml` and `/robots.txt`: every URL starts with `https://www.suppliedpackaging.com`. `robots.txt` still allows crawling.

## Not in the sitemap

Legal pages stay indexable, with their own canonicals, but they are left out of the sitemap: `/terms`, `/privacy-policy`, `/cookie-policy`. `/admin`, `/backstage` and `/api` stay disallowed and `noindex`.
