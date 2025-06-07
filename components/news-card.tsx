import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ExternalLink } from "lucide-react"
import Image from "next/image"

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

interface NewsCardProps {
  news: NewsItem
}

function getRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "Baru saja"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes} menit yang lalu`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours} jam yang lalu`
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days} hari yang lalu`
    } else {
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    }
  } catch {
    return dateString
  }
}

export default function NewsCard({ news }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return dateString
      }
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return dateString
    }
  }

  const getImageUrl = () => {
    if (!news.image) {
      return "/placeholder.svg?height=200&width=400"
    }

    const { large, small } = news.image

    if (large && large.startsWith("http")) {
      return large
    }
    if (small && small.startsWith("http")) {
      return small
    }

    return "/placeholder.svg?height=200&width=400"
  }

  const imageUrl = getImageUrl()

  const getSourceColor = (sourceId: string) => {
    const colors = {
      "cnn-news": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      "cnbc-news": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "republika-news": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "kumparan-news": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "voa-news": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    }
    return colors[sourceId as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  }

  return (
    <a href={news.link} target="_blank" rel="noopener noreferrer" className="block">
      <Card className="h-full hover:shadow-lg transition-shadow duration-200 group cursor-pointer">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={news.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=200&width=400"
            }}
          />
          <div className="absolute top-2 left-2">
            <Badge className={getSourceColor(news.sourceId)}>{news.source}</Badge>
          </div>
        </div>

        <CardContent className="p-4 flex-1">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {news.title}
          </h3>

          <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{news.contentSnippet}</p>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              <span className="font-medium">{getRelativeTime(news.pubDate)}</span>
            </div>
            <span className="text-muted-foreground/70">{formatDate(news.pubDate)}</span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium">
            Baca Selengkapnya
            <ExternalLink className="w-3 h-3 ml-1" />
          </div>
        </CardFooter>
      </Card>
    </a>
  )
}
