"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import AutoPlay from "embla-carousel-autoplay";
import { useFindAllContentQuery } from "@/graphql/generated/output";
import { getMediaSource } from "@/utils/get-media-source";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Link from "next/link";

const TOTAL_SLIDES = 3;

export const ContentCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const { data } = useFindAllContentQuery();

  const content = data?.findAllContent ?? [];

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

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
          {content && (
            <>
              {content.map((c) => (
                <CarouselItem
                  key={c.id}
                  className="h-[50vh] md:h-[70vh] lg:h-screen w-full p-0 basis-full relative"
                >
                  <img
                    src={getMediaSource(c.backdropUrl)}
                    alt={c.title}
                    className="h-full w-full object-cover brightness-75"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-20 md:bottom-32 left-4 md:left-8 lg:left-16 max-w-2xl z-10">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg">
                      {c.title}
                    </h2>
                    <Link href={`/movie/${c.id}`}>
                      <Button className="bg-white text-black hover:bg-white/90 font-semibold">
                        Подробнее
                      </Button>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </>
          )}
        </CarouselContent>
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-10">
          {Array.from({ length: TOTAL_SLIDES }).map((_, index) => (
            <button
              key={index}
              className={`h-2 md:h-3 rounded-full transition-all duration-300 cursor-pointer ${
                index === current
                  ? "bg-white w-6 md:w-8 shadow-lg"
                  : "bg-white/60 w-2 md:w-3 hover:bg-white/80"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};
