import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('demo123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'demo@journal.app' },
    update: {},
    create: { email: 'demo@journal.app', password },
  })

  await prisma.journalEntry.upsert({
    where: { id: 'seed-entry' },
    update: {},
    create: { id: 'seed-entry', title: 'First day', content: 'Started journaling today.', date: '2026-11-06', ownerId: user.id },
  })

  console.log('Seed done')
}

main().finally(() => prisma.$disconnect())
