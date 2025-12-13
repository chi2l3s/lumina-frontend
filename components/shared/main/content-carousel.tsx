"use client"

import * as React from "react"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import AutoPlay from "embla-carousel-autoplay"

const TOTAL_SLIDES = 3

export const ContentCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] lg:h-screen">
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        plugins={[
          AutoPlay({
            delay: 10000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="w-full h-full m-0">
          <CarouselItem className="h-[50vh] md:h-[70vh] lg:h-screen w-full p-0 basis-full brightness-75">
            <img src="/example.jpg" alt="Slide 1" className="h-full w-full object-cover" />
          </CarouselItem>
          <CarouselItem className="h-[50vh] md:h-[70vh] lg:h-screen w-full p-0 basis-full brightness-75">
            <img src="/example.jpg" alt="Slide 2" className="h-full w-full object-cover" />
          </CarouselItem>
          <CarouselItem className="h-[50vh] md:h-[70vh] lg:h-screen w-full p-0 basis-full brightness-75">
            <img src="/example.jpg" alt="Slide 3" className="h-full w-full object-cover" />
          </CarouselItem>
        </CarouselContent>
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-10">
          {Array.from({ length: TOTAL_SLIDES }).map((_, index) => (
            <button
              key={index}
              className={`h-2 md:h-3 rounded-full transition-all duration-300 cursor-pointer ${
                index === current ? "bg-white w-6 md:w-8 shadow-lg" : "bg-white/60 w-2 md:w-3 hover:bg-white/80"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}
