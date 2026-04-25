# Authentication Standards

Authentication in this project is handled exclusively by **Clerk** (`@clerk/nextjs`). No other authentication libraries, custom session handling, JWT utilities, or `next-auth` integrations should ever be introduced.

---

## Non-Negotiable Rules

1. **Clerk is the only auth provider.** Never install or use `next-auth`, `lucia`, `iron-session`, custom JWT logic, or any other auth library.
2. **Protect `/dashboard` via middleware.** The `/dashboard` route (and all sub-routes under it) must be protected by Clerk's middleware. Unauthenticated users must be redirected to sign-in.
3. **Redirect authenticated users away from `/`.** If a signed-in user visits the homepage (`/`), they must be redirected to `/dashboard`.
4. **Sign-in and Sign-up must open as modal windows.** Never navigate to a dedicated `/sign-in` or `/sign-up` page. Always use Clerk's modal mode.
5. **Never expose auth state logic in Server Components manually.** Use Clerk helpers (`auth()`, `currentUser()`, `clerkMiddleware`) — do not hand-roll session checks.
6. **Never expose `CLERK_SECRET_KEY` to the client.** Only `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` may be referenced in client-side code.

---

## Required Environment Variables

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

No `NEXT_PUBLIC_CLERK_SIGN_IN_URL` or `NEXT_PUBLIC_CLERK_SIGN_UP_URL` should point to standalone pages, because sign-in/sign-up are always opened as modals.

---

## Middleware Setup

Create `middleware.ts` at the **project root** (same level as `app/`). Use `clerkMiddleware` with `createRouteMatcher` to protect `/dashboard` and all its sub-routes.

```ts
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  // Redirect authenticated users away from the homepage
  if (userId && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Protect /dashboard — unauthenticated users are redirected to the homepage
  // where they can open the sign-in modal. Do NOT use auth.protect() here as
  // it redirects to Clerk's hosted sign-in page, which violates the modal rule.
  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL('/', req.url))
  }
})

export const config = {
  matcher: [
    // Run on all routes except Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
```

**Key points:**
- **Do NOT use `auth.protect()`** — it redirects to Clerk's hosted sign-in page, which violates the modal-only rule. Always redirect to `/` manually so the sign-in modal can be triggered from the homepage.
- The homepage redirect check (`userId && pathname === '/'`) must come **before** the `isProtectedRoute` check.

---

## Modal Sign-In / Sign-Up

Sign-in and sign-up must always launch as Clerk modal windows. Use `<SignInButton mode="modal">` and `<SignUpButton mode="modal">`. Never render `<SignIn>` or `<SignUp>` components as standalone pages or link to `/sign-in` / `/sign-up` routes.

### Correct — Modal mode (required)

```tsx
import { SignInButton, SignUpButton } from '@clerk/nextjs'

// Inside a 'use client' component or server component header
<SignInButton mode="modal">
  <button>Sign in</button>
</SignInButton>

<SignUpButton mode="modal">
  <button>Sign up</button>
</SignUpButton>
```

### Incorrect — Do NOT do this

```tsx
// ❌ Navigates to a full page — forbidden
<SignInButton />

// ❌ Standalone page component — forbidden
import { SignIn } from '@clerk/nextjs'
export default function SignInPage() {
  return <SignIn />
}
```

> The `mode` prop defaults to `"redirect"` in some Clerk versions. Always explicitly set `mode="modal"` to guarantee modal behaviour.

---

## Showing Auth Buttons Conditionally

Use Clerk's `<SignedIn>` and `<SignedOut>` wrapper components (or the `<Show>` shorthand available in `@clerk/nextjs`) to conditionally render auth UI. Do not use `useAuth()` or `auth()` just to show/hide buttons.

```tsx
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

<SignedOut>
  <SignInButton mode="modal"><button>Sign in</button></SignInButton>
  <SignUpButton mode="modal"><button>Sign up</button></SignUpButton>
</SignedOut>
<SignedIn>
  <UserButton />
</SignedIn>
```

---

## Accessing the Authenticated User in Server Components / Actions

Use `auth()` from `@clerk/nextjs/server` to retrieve the `userId`. Always guard writes with an auth check.

```ts
import { auth } from '@clerk/nextjs/server'

export async function myServerAction() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  // proceed with userId-scoped database operations
}
```

Use `currentUser()` only when you need the full user profile object (name, email, etc.). Prefer `auth()` for simple `userId` checks as it is cheaper.

---

## Route Protection Summary

| Route | Rule |
|---|---|
| `/` | Publicly accessible; signed-in users are redirected to `/dashboard` |
| `/dashboard` and sub-routes | Requires authentication; unauthenticated users are redirected to `/` where the sign-in modal can be opened |
| All other routes | Public by default unless explicitly added to `createRouteMatcher` |

---

## File Locations

| File | Purpose |
|---|---|
| `middleware.ts` (project root) | Clerk middleware — route protection and homepage redirect |
| `app/layout.tsx` | Wraps the app in `<ClerkProvider>` |

`<ClerkProvider>` must wrap the entire application in `app/layout.tsx`. It is already present — do not remove or move it.

---

## What Not to Do

- Do not create `app/sign-in/[[...sign-in]]/page.tsx` or `app/sign-up/[[...sign-up]]/page.tsx` catch-all pages.
- Do not set `NEXT_PUBLIC_CLERK_SIGN_IN_URL` or `NEXT_PUBLIC_CLERK_SIGN_UP_URL` to custom routes.
- Do not use `<SignIn>` or `<SignUp>` components as page-level components.
- Do not protect routes using `if (!session)` checks in individual page components — use middleware.
- Do not call `clerkClient` for authentication decisions; it is for user management only.
