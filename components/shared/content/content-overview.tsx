"use client";

import { FindContentByIdQuery } from "@/graphql/generated/output";
import { getMediaSource } from "@/utils/get-media-source";
import Image from "next/image";
import { ContentTabs } from "./content-tabs";

interface ContentOverviewProps {
  content: FindContentByIdQuery["findContentById"];
}

export const ContentOverview = ({ content }: ContentOverviewProps) => {
  return (
    <div className="relative w-full h-[800px] mt-32 overflow-hidden">
      <Image
        src={getMediaSource(content.backdropUrl)}
        alt={content.title}
        fill
        className="object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-black/60" />

      <div className="absolute inset-0">
        <ContentTabs content={content} />
      </div>
    </div>
  );
};
