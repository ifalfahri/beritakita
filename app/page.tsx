"use client"

import { useState } from "react"
import NewsGrid from "@/components/news-grid"
import NewsHeader from "@/components/news-header"

export default function HomePage() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")

  return (
    <div className="min-h-screen bg-background">
      <NewsHeader onSourceChange={setSelectedSource} onSearch={setSearchQuery} />
      <main className="container mx-auto px-4 py-8">
        <NewsGrid selectedSource={selectedSource} searchQuery={searchQuery} />
      </main>
    </div>
  )
}
