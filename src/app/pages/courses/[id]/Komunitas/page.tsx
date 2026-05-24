'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/app/lib/supabase'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

type Post = {
  id: string
  content: string
  created_at: string
}

async function fetchPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('id, content, created_at')
    .order('created_at', { ascending: true })
  if (error) throw new Error(error.message)
  return data ?? []
}

async function createPost(payload: { content: string }) {
  const { error } = await supabase.from('posts').insert(payload)
  if (error) throw new Error(error.message)
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('id-ID', {
    hour: '2-digit', minute: '2-digit'
  })
}

function formatDateLabel(dateStr: string) {
  const date = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  if (date.toDateString() === today.toDateString()) return 'Hari ini'
  if (date.toDateString() === yesterday.toDateString()) return 'Kemarin'
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

const AVATAR_COLORS = [
  '#f97316', '#fb923c', '#ea580c', '#c2410c',
  '#fdba74', '#fed7aa', '#f59e0b', '#d97706'
]

function getAvatarColor(id: string) {
  const index = id.charCodeAt(0) % AVATAR_COLORS.length
  return AVATAR_COLORS[index]
}

const KomunitasPage = () => {
  const queryClient = useQueryClient()
  const bottomRef = useRef<HTMLDivElement>(null)
  const [content, setContent] = useState('')
  const router = useRouter()

  useEffect(() => {
    const channel = supabase
      .channel('posts-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => {
        queryClient.invalidateQueries({ queryKey: ['komunitas', 'posts'] })
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [queryClient])

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['komunitas', 'posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60,
  })

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['komunitas', 'posts'] })
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    },
  })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [posts])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    mutation.mutate({ content: content.trim() })
    setContent('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (content.trim()) {
        mutation.mutate({ content: content.trim() })
        setContent('')
      }
    }
  }

  type GroupedPost = { dateLabel: string; posts: Post[] }
  const groupedPosts: GroupedPost[] = []
  posts?.forEach((post) => {
    const label = formatDateLabel(post.created_at)
    const last = groupedPosts[groupedPosts.length - 1]
    if (last && last.dateLabel === label) {
      last.posts.push(post)
    } else {
      groupedPosts.push({ dateLabel: label, posts: [post] })
    }
  })

  return (
    <div className="flex flex-col h-screen bg-orange-50 font-sans">

      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 bg-white border-b border-orange-100 shadow-sm z-10">
        {/* Tombol Kembali */}
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-orange-50 transition-colors"
        >
          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Avatar grup */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
          BK
        </div>

        <div className="flex-1">
          <h1 className="text-gray-800 font-bold text-sm leading-tight">Komunitas BelajarKuy</h1>
          <p className="text-orange-400 text-xs">
            {isLoading ? '...' : `${posts?.length ?? 0} pesan`}
          </p>
        </div>

        {/* Live badge */}
        <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-orange-500 text-xs font-medium">Live</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-0.5">

        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <div className="flex gap-1.5">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}

        {isError && (
          <div className="text-center py-8 text-red-400 text-sm">
            ⚠️ Gagal memuat pesan. Coba refresh halaman.
          </div>
        )}

        {!isLoading && posts?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-300">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-3xl">
              💬
            </div>
            <p className="text-sm text-gray-400">Belum ada pesan. Mulai diskusi!</p>
          </div>
        )}

        {groupedPosts.map(({ dateLabel, posts: dayPosts }) => (
          <div key={dateLabel}>
            {/* Date separator */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-orange-100" />
              <span className="text-gray-400 text-xs bg-orange-50 px-3 py-0.5 rounded-full border border-orange-100">
                {dateLabel}
              </span>
              <div className="flex-1 h-px bg-orange-100" />
            </div>

            {dayPosts.map((post, idx) => {
              const avatarColor = getAvatarColor(post.id)
              const initial = post.id.slice(0, 1).toUpperCase()
              const prevPost = dayPosts[idx - 1]
              const isFirst = idx === 0 || prevPost.id.slice(0, 4) !== post.id.slice(0, 4)

              return (
                <div key={post.id} className={`flex items-end gap-2.5 group ${isFirst ? 'mt-4' : 'mt-0.5'}`}>
                  {/* Avatar */}
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-sm"
                    style={{
                      backgroundColor: avatarColor,
                      visibility: isFirst ? 'visible' : 'hidden'
                    }}
                  >
                    {initial}
                  </div>

                  {/* Bubble */}
                  <div className="max-w-[75%]">
                    <div className="bg-white text-gray-700 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm border border-orange-50 leading-relaxed">
                      {post.content}
                    </div>
                    <p className="text-gray-300 text-[10px] mt-1 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {formatTime(post.created_at)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="px-4 pb-5 pt-3 bg-white border-t border-orange-100 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]"
      >
        <div className="flex items-end gap-2 bg-orange-50 border border-orange-100 rounded-2xl px-4 py-2.5">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ketik pesan... (Enter untuk kirim)"
            rows={1}
            className="flex-1 bg-transparent text-gray-700 text-sm outline-none resize-none placeholder:text-gray-300 max-h-32"
            style={{ lineHeight: '1.5' }}
          />
          <button
            type="submit"
            disabled={mutation.isPending || !content.trim()}
            className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-400 active:bg-orange-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all flex-shrink-0 mb-0.5 shadow-sm"
          >
            {mutation.isPending ? (
              <div className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4 text-white rotate-45 -translate-x-px" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-gray-300 text-[10px] mt-1.5 text-center">Shift+Enter untuk baris baru</p>
      </form>
    </div>
  )
}

export default KomunitasPage