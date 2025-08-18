# MovieDB SSR App

A server-side rendered movie browsing app built with **Vite**, **React**, **TypeScript**, **Express**, and **Sass**, using data from [The Movie Database (TMDB)](https://www.themoviedb.org/) API.

---

## Prerequisites

- **Node.js** v18 or higher
- **npm**, **yarn**, or **pnpm**
- A TMDB API key ([create one](https://www.themoviedb.org/settings/api))

---

## Quick Start

```bash
# 1) Clone
git clone <your-repo-url>
cd <your-repo>

# 2) Install
npm install

# 3) Create .env
printf "TMDB_API_TOKEN=your_tmdb_api_key_here\nPORT=5173\nBASE=/\n" > .env

# 4) Run in dev
npm run dev
# open http://localhost:5173

# 5) (Optional) Run tests
npm run tests

# 5) (Optional) Run tests coverage
npm run coverage

# 6) Build & run in production
npm run build
npm run preview
```
