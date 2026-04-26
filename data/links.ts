import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { links } from '@/db/schema'

export async function getUserLinks() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(links.createdAt)
}
