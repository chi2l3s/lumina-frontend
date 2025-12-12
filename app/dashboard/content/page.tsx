import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { PiFilmSlateBold } from "react-icons/pi";
import { TbMovie } from "react-icons/tb";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
  FindAllContentDocument,
  FindAllContentQuery,
} from "@/graphql/generated/output";
import { SERVER_URL } from "@/lib/constants/env";
import { notFound } from "next/navigation";
import Link from "next/link";

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
    console.error(error);
    return notFound();
  }
}

export const metadata: Metadata = {
  title: "Контент",
};

export default async function DashboardContentPage() {
  const { content } = await findAllContent();

  return (
    <div className="flex flex-col items-start space-y-6">
      <div className="flex items-center gap-x-3">
        <Link href={"/dashboard/content/create/movie"}>
          <Button>
            <PiFilmSlateBold />
            Добавить фильм
          </Button>
        </Link>
        <Link href={"/dashboard/content/create/series"}>
          <Button>
            <TbMovie />
            Добавить сериал
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={content} />
    </div>
  );
}
