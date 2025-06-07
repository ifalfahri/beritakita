import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = "https://berita-indo-api-next.vercel.app/api"

// Mapping of source names to API endpoints
const sourceMapping: Record<string, string> = {
  "cnn-indonesia": "cnn-indonesia",
  "cnbc-indonesia": "cnbc-indonesia",
  republika: "republika",
  tempo: "tempo",
  "antara-news": "antara-news",
  kompas: "kompas",
}

export async function GET(request: NextRequest, { params }: { params: { source: string } }) {
  try {
    const { source } = params

    // Validate source
    if (!sourceMapping[source]) {
      return NextResponse.json({ success: false, message: "Invalid news source" }, { status: 400 })
    }

    const apiEndpoint = sourceMapping[source]
    const apiUrl = `${API_BASE_URL}/${apiEndpoint}`

    console.log("Fetching from:", apiUrl)

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "BeritaKu/1.0",
      },
      // Add cache control
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
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
