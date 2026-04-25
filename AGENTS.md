# Agent Instructions — Link Shortener Project

This file is the entry point for LLM coding agents working in this repository. It defines the rules, standards, and references every agent must follow. All detailed standards are broken out into individual files in the `/docs` directory.

---

## Project Summary

A Next.js 16 URL shortener. Users create short slugs for long URLs. Authentication is handled by Clerk. Data is stored in a Neon (serverless PostgreSQL) database via Drizzle ORM. The UI is built with Tailwind CSS v4 and shadcn components.

---

## Mandatory Reading

> **CRITICAL — NON-NEGOTIABLE**
> You MUST read the relevant `/docs` files **before writing a single line of code**. No exceptions. Generating code without reading the applicable doc first will produce incorrect, non-compliant output. If you are unsure which doc applies, read all of them. This is not optional.

BEFORE generating any code, use `read_file` (or equivalent) to load and read **every** doc that is relevant to the area you are working in:

| Topic | File |
|---|---|
| Clerk - Authentication, Integration, Route protection | `docs/authentication.md` |
| UI Components - shadcn usage, composition, forms | `docs/ui-components.md` |

**Do not proceed to implementation until you have read the applicable file(s) above.**


---

## Non-Negotiable Rules

These apply everywhere, regardless of the task:

1. **TypeScript strict mode is on.** No `any`, no unchecked non-null assertions, no type suppressions.
2. **App Router only.** No `pages/` directory. No `getServerSideProps` or `getStaticProps`.
3. **Server Components by default.** Add `'use client'` only when required (hooks, browser APIs, event listeners).
4. **Auth every write.** Every Server Action and Route Handler that modifies data must verify the Clerk `userId` before proceeding.
5. **Never expose env vars to the client.** Only `NEXT_PUBLIC_*` variables are safe for client use.
6. **Use `cn()` for class merging.** Never concatenate Tailwind classes with template literals.
7. **No raw SQL.** Use Drizzle ORM's query builder for all database operations.
8. **Filter by `userId`.** Database queries that return user-owned data must always include a `userId` filter.
9. **Named exports for components.** Exception: Next.js page/layout files must use `export default`.
10. **No new dependencies without cause.** Do not install packages that duplicate existing ones. Check `package.json` first.

---

## Repository Layout

```
app/                  Next.js App Router (pages, layouts, API routes)
components/
  ui/                 shadcn-generated primitives — do not hand-edit
  <feature>/          Feature-specific components
db/
  index.ts            Drizzle client singleton
  schema.ts           All table definitions
lib/
  utils.ts            cn() and shared utilities
docs/                 Coding standards (this directory)
drizzle/              Generated SQL migrations (do not edit)
drizzle.config.ts     Drizzle Kit config
```

---

## Common Commands

```bash
# Development server
npm run dev

# Lint
npm run lint

# Push schema changes to Neon (development)
npx drizzle-kit push

# Generate migration files (production)
npx drizzle-kit generate
npx drizzle-kit migrate

# Add a shadcn component
npx shadcn add <component>
```
