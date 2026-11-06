'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function AddEntry() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const r = useRouter()
  async function submit(e: any) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/entries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, content }) })
    setTitle(''); setContent(''); setLoading(false); r.refresh()
  }
  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-4 space-y-2">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title (optional)" className="w-full border p-2 rounded text-sm" />
      <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="What's on your mind?" className="w-full border p-2 rounded text-sm" rows={3} required />
      <button type="submit" disabled={loading} className="bg-stone-600 text-white px-4 py-1 rounded text-sm disabled:opacity-50">Save</button>
    </form>
  )
}
