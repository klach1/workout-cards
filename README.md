# Workout Cards — Calisthenics

Interaktivní tréninkový plán pro kalistenika ve formě karet. 3 tréninky týdně (A/B/C) s warmupem, skill blokem, silovou částí a core.

## Funkce

- **3 tréninkové karty** — Den A, B, C s různými cviky
- **Beginner skills** — L-sit, Headstand, Crow pose s rozklikávacími progresemi krok za krokem
- **Přepínání skillů** — vyber si aktuální skill a promítne se do všech karet
- **Rozklikávací detaily** — každý cvik má popis provedení, tipy a na co myslet
- Responsive design, funguje na mobilu i desktopu

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui (Card, Badge)
- lucide-react ikony

## Spuštění lokálně

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Hostováno na Cloudflare Pages:

```bash
npx wrangler pages deploy dist --project-name=workout-cards
```

Live na: https://workout-cards.pages.dev
