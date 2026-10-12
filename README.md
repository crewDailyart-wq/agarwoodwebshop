# AURUM OUD (working name)

Webshop for genuine agarwood chips and an incense burner. Next.js 16 (App Router, Cache Components), Tailwind 4, Mollie payments.

## Run

```
npm install
cp .env.example .env.local   # then fill in
npm run dev
```

## Where things live

- `src/content/catalog.ts` — the two products and the bundle. **Prices are placeholders** until `pricesConfirmed` is set to true. Unverified facts (origin, species, weight…) are `null` and simply not shown.
- `src/content/site.ts` — brand name, contact, shipping countries, tax settings.
- `src/components/PhotoSlot.tsx` — shows a labelled placeholder until a real photo path is set in the catalog (`/public/photos/…`).
- `src/app/api/checkout` — validates the cart against the catalog on the server and creates a Mollie payment (iDEAL and other methods appear on Mollie's hosted page).

## Not built yet

Order storage + confirmation emails + stock decrement (webhook is a stub), interactive map, scent explorer, ritual scroll sequence, unboxing, sticky mobile buy bar.
