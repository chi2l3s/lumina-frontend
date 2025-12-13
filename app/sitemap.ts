import {
  FindAllContentDocument,
  FindAllContentQuery,
} from "@/graphql/generated/output";
import { APP_URL, SERVER_URL } from "@/lib/constants/env";
import { MetadataRoute } from "next";

async function findAllContent() {
  try {
    const query = FindAllContentDocument.loc?.source.body;

    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: {
        revalidate: 30,
      },
    });

    const data = await response.json();

    return {
      content: data.data
        .findAllContent as FindAllContentQuery["findAllContent"],
    };
  } catch (error) {
    console.log(error);
    throw new Error("Ошибка при получении категорий");
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { content } = await findAllContent()

    const routes: MetadataRoute.Sitemap = [
        {
            url: APP_URL,
            lastModified: new Date().toISOString(),
            priority: 1.0
        },
        {
            url: APP_URL + '/download',
            lastModified: new Date().toISOString(),
            priority: 0.8
        }
    ]

    content.forEach(content =>
        routes.push({
            url: APP_URL + `/movie/${content.id}`,
            lastModified: content.updatedAt,
            priority: 0.6
        })
    )

    return routes
}