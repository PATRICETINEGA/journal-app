import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import AddEntry from '@/components/AddEntry'
export default async function Dash() {
  const s = await getSession()
  if (!s) redirect('/login')
  const uid = (s.user as any).id
  const entries = await prisma.journalEntry.findMany({ where: { ownerId: uid }, orderBy: { date: 'desc' } })
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Journal</h1>
        <Link href="/api/auth/signout" className="text-sm text-red-600">Sign out</Link>
      </div>
      <AddEntry />
      <div className="space-y-3">
        {entries.map((e: any) => (
          <div key={e.id} className="bg-white p-4 rounded shadow text-sm">
            {e.title && <p className="font-medium">{e.title}</p>}
            <p className="text-gray-600 mt-1">{e.content}</p>
            <p className="text-xs text-gray-400 mt-2">{e.date}</p>
          </div>
        ))}
        {entries.length === 0 && <p className="text-gray-500">No entries yet</p>}
      </div>
    </div>
  )
}
