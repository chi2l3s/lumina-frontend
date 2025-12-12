import { ContentOverview } from "@/components/shared/content/content-overview";
import {
  FindContentByIdDocument,
  FindContentByIdQuery,
} from "@/graphql/generated/output";
import { SERVER_URL } from "@/lib/constants/env";
import { getMediaSource } from "@/utils/get-media-source";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

async function findContentById(params: { id: string }) {
  try {
    const query = FindContentByIdDocument.loc?.source.body;
    const variables = { contentId: params.id };

    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      next: {
        revalidate: 30,
      },
    });

    const data = await response.json();

    return {
      content: data.data
        .findContentById as FindContentByIdQuery["findContentById"],
    };
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { content } = await findContentById(params);

  return {
    title: `${content.title} (${content.releaseYear})`,
    description: content.description,
    openGraph: {
      images: [
        {
          url: getMediaSource(content.backdropUrl),
          alt: content.title,
        },
      ],
    },
  };
}

export default async function ContentPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const { content } = await findContentById(params);

  return <ContentOverview content={content} />;
}
