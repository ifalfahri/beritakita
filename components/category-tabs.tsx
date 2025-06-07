"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface Category {
  id: string
  name: string
  endpoint: string
}

interface CategoryTabsProps {
  categories: Category[]
  activeCategory: Category
  onCategoryChange: (category: Category) => void
}

export default function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-2 pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory.id === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={`flex-shrink-0 ${
              activeCategory.id === category.id
                ? "bg-red-600 hover:bg-red-700"
                : "hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            }`}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
