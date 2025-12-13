"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useFindAllContentQuery } from "@/graphql/generated/output";
import { getMediaSource } from "@/utils/get-media-source";
import Link from "next/link";

export const ContentList = () => {
  const { data, loading } = useFindAllContentQuery();

  const content = data?.findAllContent ?? [];

  if (loading) {
    return (
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="flex gap-x-2 md:gap-x-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CarouselItem
              className="basis-[140px] sm:basis-[200px] md:basis-[300px] lg:basis-[390px]"
              key={i}
            >
              <Skeleton className="rounded-md h-[180px] sm:h-[260px] md:h-[390px] lg:h-[430px] w-full" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent className="flex gap-x-2 md:gap-x-4">
        {content.map((c) => (
          <CarouselItem
            className="basis-[140px] sm:basis-[200px] md:basis-[300px] lg:basis-[390px] cursor-pointer"
            key={c.id}
          >
            <Link href={`/movie/${c.id}`} className="w-full h-full block">
              <img
                src={getMediaSource(c.posterUrl) || "/placeholder.svg"}
                alt={c.title || "Content"}
                className="rounded-md w-full h-[180px] sm:h-[260px] md:h-[390px] lg:h-[550px] hover:scale-105 transition-all duration-300 object-cover"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden md:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};
