"use client"

import { useEffect, useState, useCallback } from "react"
import { useInView } from "react-intersection-observer"
import NewsCard from "./news-card"
import { Loader2 } from "lucide-react"

interface NewsItem {
  title: string
  link: string
  contentSnippet: string
  pubDate: string
  source: string
  sourceId: string
  image?: {
    small?: string
    large?: string
  }
}

interface NewsGridProps {
  selectedSource?: string | null
  searchQuery?: string
}

export default function NewsGrid({ selectedSource, searchQuery }: NewsGridProps) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  })

  const fetchNews = useCallback(
    async (pageNum: number, reset = false) => {
      try {
        if (pageNum === 1) {
          setLoading(true)
        } else {
          setLoadingMore(true)
        }
        setError(null)

        const params = new URLSearchParams({
          page: pageNum.toString(),
          limit: "15",
        })

        if (selectedSource) {
          params.append("source", selectedSource)
        }

        console.log("Fetching with params:", params.toString())
        const response = await fetch(`/api/news?${params}`)

        if (!response.ok) {
          const errorText = await response.text()
          console.error("API Error:", response.status, errorText)
          throw new Error(`Failed to fetch news: ${response.status}`)
        }

        const data = await response.json()
        console.log("API Response:", data)

        if (data.success && data.data && data.data.posts) {
          let filteredPosts = data.data.posts

          if (searchQuery && searchQuery.trim()) {
            filteredPosts = filteredPosts.filter(
              (post: NewsItem) =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.contentSnippet.toLowerCase().includes(searchQuery.toLowerCase()),
            )
          }

          if (reset || pageNum === 1) {
            setNews(filteredPosts)
          } else {
            setNews((prev) => [...prev, ...filteredPosts])
          }

          setHasMore(data.data.hasMore && filteredPosts.length > 0)
        } else {
          console.error("Invalid response structure:", data)
          throw new Error(data.message || "Failed to load news")
        }
      } catch (err) {
        console.error("Fetch error:", err)
        setError(err instanceof Error ? err.message : "An error occurred")
        if (pageNum === 1) {
          setNews([])
        }
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [selectedSource, searchQuery],
  )

  useEffect(() => {
    setPage(1)
    setHasMore(true)
    fetchNews(1, true)
  }, [selectedSource, searchQuery])

  useEffect(() => {
    if (inView && hasMore && !loading && !loadingMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchNews(nextPage)
    }
  }, [inView, hasMore, loading, loadingMore, page, fetchNews])

  const getTitle = () => {
    if (selectedSource) {
      const sourceName =
        {
          "cnn-news": "CNN Indonesia",
          "cnbc-news": "CNBC Indonesia",
          "republika-news": "Republika",
          "kumparan-news": "Kumparan",
          "voa-news": "VOA Indonesia",
        }[selectedSource] || selectedSource
      return `Berita dari ${sourceName}`
    }
    if (searchQuery) {
      return `Hasil pencarian: "${searchQuery}"`
    }
    return "Berita Terkini Indonesia"
  }

  const getSubtitle = () => {
    if (selectedSource || searchQuery) {
      return `Menampilkan ${news.length} artikel`
    }
    return "Dapatkan berita terbaru dari berbagai sumber terpercaya"
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-muted rounded w-64 animate-pulse mb-2"></div>
            <div className="h-4 bg-muted rounded w-48 animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card rounded-lg shadow-sm border animate-pulse">
              <div className="w-full h-48 bg-muted rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-destructive mb-2">Gagal Memuat Berita</h3>
          <p className="text-destructive/80 mb-4">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{getTitle()}</h1>
        <p className="text-muted-foreground">{getSubtitle()}</p>
      </div>

      {news.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Tidak ada berita yang ditemukan</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <NewsCard key={`${item.link}-${index}`} news={item} />
            ))}
          </div>

          {hasMore && (
            <div ref={ref} className="flex justify-center py-8">
              {loadingMore && (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memuat berita lainnya...</span>
                </div>
              )}
            </div>
          )}

          {!hasMore && news.length > 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Tidak ada berita lainnya</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
