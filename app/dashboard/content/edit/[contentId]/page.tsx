import { EditMovieForm } from "@/components/shared/admin/forms/edit-movie-form";
import {
  FindContentByIdDocument,
  FindContentByIdQuery,
} from "@/graphql/generated/output";
import { SERVER_URL } from "@/lib/constants/env";
import { getMediaSource } from "@/utils/get-media-source";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

async function getContent(params: { contentId: string }) {
  try {
    const query = FindContentByIdDocument.loc?.source.body;
    const variables = { contentId: params.contentId };

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
  params: Promise<{ contentId: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { content } = await getContent(params);

  const isMovie = content.movie !== null;

  return {
    title: `Редактирование ${isMovie ? "фильма" : "сериала"} ${content.title}`,
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

export default async function EditContentPage(props: {
  params: Promise<{ contentId: string }>;
}) {
  const params = await props.params;

  const { content } = await getContent(params);

  return (
    <>{content.movie ? <EditMovieForm content={content} /> : <div></div>}</>
  );
}
