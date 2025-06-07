import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = "https://berita-indo-api-next.vercel.app"

// Updated news sources - replaced tempo with kumparan
const NEWS_SOURCES = {
  "cnn-news": {
    name: "CNN Indonesia",
    endpoint: "/api/cnn-news",
  },
  "cnbc-news": {
    name: "CNBC Indonesia",
    endpoint: "/api/cnbc-news",
  },
  "republika-news": {
    name: "Republika",
    endpoint: "/api/republika-news",
  },
  "kumparan-news": {
    name: "Kumparan",
    endpoint: "/api/kumparan-news",
  },
  "voa-news": {
    name: "VOA Indonesia",
    endpoint: "/api/voa-news",
  },
}

function normalizePost(post: any, sourceId: string, sourceName: string) {
  // Handle different content field names
  const content = post.contentSnippet || post.content || post.description || ""

  // Handle different image formats
  let image = null
  if (post.image) {
    if (typeof post.image === "object") {
      if (post.image.extraLarge || post.image.large || post.image.medium || post.image.small) {
        // For Kumparan (has small, medium, large, extraLarge)
        image = {
          small: post.image.small || post.image.medium,
          large: post.image.extraLarge || post.image.large || post.image.medium,
        }
      } else if (post.image.small || post.image.large) {
        // For CNN, CNBC, Republika
        image = {
          small: post.image.small,
          large: post.image.large || post.image.small,
        }
      }
    } else if (typeof post.image === "string" && post.image.startsWith("http")) {
      // For VOA (direct URL string)
      image = {
        small: post.image,
        large: post.image,
      }
    }
  }

  return {
    title: post.title || "",
    link: post.link || "",
    contentSnippet: content,
    pubDate: post.isoDate || post.pubDate || "",
    image: image,
    source: sourceName,
    sourceId: sourceId,
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const source = searchParams.get("source")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    if (source && NEWS_SOURCES[source as keyof typeof NEWS_SOURCES]) {
      return await fetchFromSource(source, page, limit)
    } else {
      return await fetchFromAllSources(page, limit)
    }
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch news data",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

async function fetchFromSource(source: string, page: number, limit: number) {
  const sourceConfig = NEWS_SOURCES[source as keyof typeof NEWS_SOURCES]
  const apiUrl = `${API_BASE_URL}${sourceConfig.endpoint}`

  console.log("Fetching from:", apiUrl)

  const response = await fetch(apiUrl, {
    headers: {
      "User-Agent": "BeritaKita/1.0",
    },
    next: { revalidate: 300 },
    redirect: "follow",
  })

  if (!response.ok) {
    throw new Error(`API responded with status: ${response.status}`)
  }

  const data = await response.json()

  if (data.data && Array.isArray(data.data)) {
    const normalizedPosts = data.data
      .map((post: any) => normalizePost(post, source, sourceConfig.name))
      .filter((post: any) => post.title && post.link)
      .sort((a: any, b: any) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = normalizedPosts.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        posts: paginatedPosts,
        hasMore: endIndex < normalizedPosts.length,
        total: data.total || normalizedPosts.length,
        page,
        limit,
      },
    })
  }

  throw new Error("Invalid response format")
}

async function fetchFromAllSources(page: number, limit: number) {
  const promises = Object.entries(NEWS_SOURCES).map(async ([sourceId, config]) => {
    try {
      console.log(`Fetching from ${config.name}:`, `${API_BASE_URL}${config.endpoint}`)

      const response = await fetch(`${API_BASE_URL}${config.endpoint}`, {
        headers: {
          "User-Agent": "BeritaKita/1.0",
        },
        next: { revalidate: 300 },
        redirect: "follow",
      })

      if (!response.ok) {
        console.error(`Failed to fetch from ${config.name}:`, response.status, response.statusText)
        return []
      }

      const data = await response.json()
      console.log(`Response from ${config.name}:`, data.total || 0, "articles")

      if (data.data && Array.isArray(data.data)) {
        return data.data
          .slice(0, 8)
          .map((post: any) => normalizePost(post, sourceId, config.name))
          .filter((post: any) => post.title && post.link)
      }
      return []
    } catch (error) {
      console.error(`Error fetching from ${config.name}:`, error)
      return []
    }
  })

  const results = await Promise.allSettled(promises)
  const allPosts = results
    .filter((result): result is PromiseFulfilledResult<any[]> => result.status === "fulfilled")
    .flatMap((result) => result.value)
    .filter((post) => post && post.title)

  allPosts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

  console.log(`Total posts collected: ${allPosts.length}`)

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedPosts = allPosts.slice(startIndex, endIndex)

  return NextResponse.json({
    success: true,
    data: {
      posts: paginatedPosts,
      hasMore: endIndex < allPosts.length,
      total: allPosts.length,
      page,
      limit,
    },
  })
}
