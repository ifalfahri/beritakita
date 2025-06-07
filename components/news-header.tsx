"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Search, Menu, X, Moon, Sun, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import Link from "next/link"

const NEWS_SOURCES = {
  "cnn-news": {
    name: "CNN Indonesia",
  },
  "cnbc-news": {
    name: "CNBC Indonesia",
  },
  "republika-news": {
    name: "Republika",
  },
  "kumparan-news": {
    name: "Kumparan",
  },
  "voa-news": {
    name: "VOA Indonesia",
  },
}

interface NewsHeaderProps {
  onSourceChange?: (source: string | null) => void
  onSearch?: (query: string) => void
}

export default function NewsHeader({ onSourceChange, onSearch }: NewsHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  const handleHomeClick = () => {
    onSourceChange?.(null)
  }

  const handleSourceSelect = (sourceId: string) => {
    onSourceChange?.(sourceId)
    setIsDropdownOpen(false)
  }

  const toggleTheme = () => {
    if (mounted) {
      setTheme(theme === "dark" ? "light" : "dark")
    }
  }

  if (!mounted) {
    return (
      <header className="bg-background shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <button className="text-2xl font-bold text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  BeritaKita
                </button>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="w-20 h-8 bg-muted rounded animate-pulse"></div>
              <div className="w-24 h-8 bg-muted rounded animate-pulse"></div>
              <div className="w-16 h-8 bg-muted rounded animate-pulse"></div>
              <div className="w-16 h-8 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-background shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <button
                onClick={handleHomeClick}
                className="text-2xl font-bold text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              >
                BeritaKita
              </button>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <Button variant="ghost" onClick={handleHomeClick}>
                Beranda
              </Button>
            </Link>

            {/* Sources Dropdown with Hover */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Button variant="ghost" className="flex items-center space-x-1">
                <span>Sumber Berita</span>
                <ChevronDown className="w-4 h-4" />
              </Button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-popover border rounded-md shadow-lg z-50">
                  <div className="p-1">
                    <div className="px-2 py-1.5 text-sm font-semibold">Pilih Sumber Berita</div>
                    <div className="h-px bg-border my-1"></div>
                    {Object.entries(NEWS_SOURCES).map(([sourceId, source]) => (
                      <button
                        key={sourceId}
                        onClick={() => handleSourceSelect(sourceId)}
                        className="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      >
                        {source.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/about">
              <Button variant="ghost">Tentang</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost">Kontak</Button>
            </Link>
          </nav>

          {/* Search Bar and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Cari berita..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </form>

            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Cari berita..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </form>

              <nav className="space-y-2">
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      handleHomeClick()
                      setIsMenuOpen(false)
                    }}
                  >
                    Beranda
                  </Button>
                </Link>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground px-3 py-2">Sumber Berita</p>
                  {Object.entries(NEWS_SOURCES).map(([sourceId, source]) => (
                    <Button
                      key={sourceId}
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      onClick={() => {
                        handleSourceSelect(sourceId)
                        setIsMenuOpen(false)
                      }}
                    >
                      {source.name}
                    </Button>
                  ))}
                </div>

                <Link href="/about">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                    Tentang
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                    Kontak
                  </Button>
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
