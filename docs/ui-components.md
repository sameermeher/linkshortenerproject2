# UI Components Standards

All UI elements in this project are built exclusively with **shadcn/ui**. Do not create custom UI primitives from scratch. Every button, input, dialog, card, dropdown, badge, table, form field, and other interactive or visual element must come from the shadcn component library.

---

## Non-Negotiable Rules

1. **shadcn only.** Never hand-roll a UI primitive (button, input, select, modal, tooltip, etc.). Always use the equivalent shadcn component.
2. **Install before use.** Before using a shadcn component, verify it exists in `components/ui/`. If it is missing, add it with the CLI command below — do not copy-paste component code manually.
3. **Never hand-edit `components/ui/`.** Files in `components/ui/` are generated and owned by shadcn. Editing them directly will be overwritten on the next `npx shadcn add`. Put customisation in feature components that wrap or compose shadcn primitives.
4. **Compose, don't replace.** If a shadcn component needs extra behaviour or styling, wrap it in a feature component under `components/<feature>/` and use `cn()` to extend classes. Never duplicate the primitive.
5. **Use `cn()` for all class merging.** Import from `@/lib/utils`. Never concatenate Tailwind classes with template literals or `+`.
6. **Icons via Lucide only.** The project's icon library is `lucide-react` (configured in `components.json`). Do not install other icon libraries.

---

## Project Configuration

shadcn is configured in `components.json` at the project root:

| Setting | Value |
|---|---|
| Style | `base-nova` |
| Base colour | `neutral` |
| CSS variables | `true` |
| Icon library | `lucide` |
| Component alias | `@/components/ui` |
| Utils alias | `@/lib/utils` |

Always keep `components.json` in sync. Do not change these settings without a deliberate reason.

---

## Adding a New shadcn Component

Use the CLI. Never manually create files inside `components/ui/`.

```bash
npx shadcn add <component-name>
```

Examples:

```bash
npx shadcn add dialog
npx shadcn add input
npx shadcn add label
npx shadcn add card
npx shadcn add badge
npx shadcn add table
npx shadcn add dropdown-menu
npx shadcn add toast
npx shadcn add form
npx shadcn add select
npx shadcn add separator
npx shadcn add sheet
```

After running the command, the component file(s) appear in `components/ui/` and are ready to import.

---

## Import Paths

Always import shadcn components from their generated file using the `@/components/ui` alias:

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
```

---

## Composing Feature Components

When you need a specialised version of a shadcn primitive, create a wrapper in `components/<feature>/` — not in `components/ui/`.

```tsx
// components/links/delete-button.tsx  ✅ correct location
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DeleteButtonProps {
  onClick: () => void
  disabled?: boolean
}

export function DeleteButton({ onClick, disabled }: DeleteButtonProps) {
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className={cn('w-full sm:w-auto')}
    >
      Delete
    </Button>
  )
}
```

---

## Using shadcn Form Components with React Hook Form

shadcn's `Form` component wraps React Hook Form. Always use `<Form>`, `<FormField>`, `<FormItem>`, `<FormLabel>`, `<FormControl>`, and `<FormMessage>` together. Never build a form with raw `<form>` + `<input>` elements.

```tsx
'use client'

import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function CreateLinkForm() {
  const form = useForm<{ url: string }>()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Shorten</Button>
      </form>
    </Form>
  )
}
```

---

## Common Patterns

### Dialogs / Modals

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    {/* content */}
  </DialogContent>
</Dialog>
```

### Cards

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>My Card</CardTitle>
  </CardHeader>
  <CardContent>
    {/* content */}
  </CardContent>
</Card>
```

### Badges

```tsx
import { Badge } from '@/components/ui/badge'

<Badge variant="secondary">Active</Badge>
```

---

## What Not to Do

```tsx
// ❌ Hand-rolled button — forbidden
<button className="bg-blue-500 text-white px-4 py-2 rounded">Click</button>

// ❌ Editing components/ui/button.tsx directly — forbidden
// (changes will be overwritten by npx shadcn add)

// ❌ Copying shadcn source code manually into the project — forbidden

// ❌ Using another component library (MUI, Chakra, Radix directly, etc.) — forbidden

// ❌ Template-literal class concatenation — forbidden
<Button className={`${isActive ? 'bg-blue-500' : ''} px-4`} />

// ✅ Correct — use cn() for conditional classes
<Button className={cn(isActive && 'bg-blue-500', 'px-4')} />
```

---

## File Locations Reference

| Path | Purpose |
|---|---|
| `components/ui/` | shadcn-generated primitives — do not hand-edit |
| `components/<feature>/` | Feature components that compose shadcn primitives |
| `lib/utils.ts` | `cn()` utility for class merging |
| `components.json` | shadcn project configuration |
