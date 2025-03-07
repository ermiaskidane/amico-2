"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PropertyGalleryProps {
  images: string[]
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handlePrevious = () => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1))
  }

  const handleNext = () => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1))
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return

      if (e.key === "ArrowLeft") {
        handlePrevious()
      } else if (e.key === "ArrowRight") {
        handleNext()
      } else if (e.key === "Escape") {
        setIsFullscreen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    // Prevent scrolling when in fullscreen mode
    if (isFullscreen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isFullscreen, images.length])


  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        <Image
          src={images[activeIndex] || "/placeholder.svg"}
          alt={`Property image ${activeIndex + 1}`}
          fill
          className="object-cover"
          priority={activeIndex === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous image</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={handleNext}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next image</span>
        </Button>

        <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 bottom-2 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={toggleFullscreen}
          >
            <Expand className="h-5 w-5" />
            <span className="sr-only">View fullscreen</span>
          </Button>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative h-20 w-20 md:h-24 md:w-24 flex-shrink-0 overflow-hidden rounded-md border-2",
              activeIndex === index ? "border-primary" : "border-transparent",
            )}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Property thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

       {/* Fullscreen Gallery */}
       {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 text-white">
            <div className="text-sm">
              Image {activeIndex + 1} of {images.length}
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={toggleFullscreen}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close fullscreen</span>
            </Button>
          </div>

          <div className="flex-1 flex items-center justify-center relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-8 w-8" />
              <span className="sr-only">Previous image</span>
            </Button>

            <div className="h-full w-full flex items-center justify-center overflow-auto">
              <Image
                src={images[activeIndex] || "/placeholder.svg"}
                alt={`Property image ${activeIndex + 1}`}
                width={1200}
                height={800}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={handleNext}
            >
              <ChevronRight className="h-8 w-8" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>

          <div className="p-4 overflow-x-auto">
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={cn(
                    "relative h-16 w-16 md:h-20 md:w-20 flex-shrink-0 overflow-hidden rounded-md border-2",
                    activeIndex === index ? "border-white" : "border-transparent",
                  )}
                  onClick={() => setActiveIndex(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Property thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

