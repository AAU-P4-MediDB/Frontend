# Svelte Dashboard Template

A clean, production-ready dashboard starter built with **SvelteKit**.
No UI library dependencies — everything is hand-crafted.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ installed

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

---

## 📁 Project Structure

```
src/
├── app.html              ← Root HTML shell (fonts loaded here)
├── app.css               ← Global CSS variables & resets
├── routes/
│   ├── +layout.svelte    ← Sidebar + main content wrapper
│   └── +page.svelte      ← Dashboard home page
└── lib/
    └── components/
        ├── Sidebar.svelte        ← Navigation sidebar
        ├── TopBar.svelte         ← Page header with live clock
        ├── StatCard.svelte       ← KPI metric card
        ├── SparklineChart.svelte ← SVG line chart (no library!)
        └── ActivityFeed.svelte   ← Animated activity list
```

---

## 🎨 Design Tokens (app.css)

All colors and spacing live in CSS variables so you can retheme instantly:

| Variable          | Purpose                   |
|-------------------|---------------------------|
| `--bg`            | Page background           |
| `--bg-card`       | Card background           |
| `--accent`        | Primary accent color      |
| `--success/danger`| Status colors             |
| `--font-display`  | Heading font (Syne)       |
| `--font-mono`     | Monospace font (DM Mono)  |

---

## ➕ Adding a New Page

1. Create `src/routes/analytics/+page.svelte`
2. Add a nav item in `Sidebar.svelte`
3. Done — SvelteKit handles routing automatically

---

## 📦 Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 🧠 Key Svelte Concepts in This Template

| Concept                | Where to find it               |
|------------------------|--------------------------------|
| Props (`export let`)   | Every component                |
| Reactive (`$:`)        | SparklineChart.svelte          |
| Lifecycle (`onDestroy`)| TopBar.svelte (live clock)     |
| Two-way binding        | Layout → Sidebar (`bind:`)     |
| `{#each}` / `{#if}`   | Sidebar, ActivityFeed          |
| Scoped CSS             | Every `<style>` block          |
| Slots                  | +layout.svelte                 |
