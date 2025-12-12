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
      >
        <CarouselContent className="flex gap-x-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CarouselItem className="basis-[390px]" key={i}>
              <Skeleton className="rounded-md h-[430px] w-[390px]" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="flex gap-x-4">
        {content.map((c) => (
          <CarouselItem className="basis-[390px] cursor-pointer" key={c.id}>
            <Link href={`/movie/${c.id}`} className="w-full h-full">
              <img
                src={getMediaSource(c.posterUrl)}
                className="rounded-md w-[422px] h-[550px] hover:scale-105 transition-all duration-300 object-contain"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
