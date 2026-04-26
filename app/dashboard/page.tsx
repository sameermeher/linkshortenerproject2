import { getUserLinks } from '@/data/links'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink } from 'lucide-react'

export default async function DashboardPage() {
  const links = await getUserLinks()

  return (
    <main className="container mx-auto max-w-3xl py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">My Links</h1>

      {links.length === 0 ? (
        <p className="text-muted-foreground">You have no shortened links yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {links.map((link) => (
            <li key={link.id}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Badge variant="secondary">{link.shortCode}</Badge>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm font-normal text-muted-foreground hover:text-foreground truncate"
                    >
                      {link.url}
                      <ExternalLink className="size-3 shrink-0" />
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground">
                    Created {new Date(link.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

