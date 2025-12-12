"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { ContentModel, FindAllContentQuery } from "@/graphql/generated/output";
import { getMediaSource } from "@/utils/get-media-source";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type ContentRow = FindAllContentQuery["findAllContent"][number];

export const columns: ColumnDef<ContentRow>[] = [
  {
    accessorKey: "title",
    header: "Название",
  },
  {
    accessorKey: "posterUrl",
    header: "Постер",
    cell: ({ row }) => {
      return (
        <Image
          src={getMediaSource(row.getValue("posterUrl"))}
          alt={row.getValue("title")}
          width={200}
          height={320}
          className="rounded-md"
        />
      );
    },
  },
  {
    accessorKey: "releaseYear",
    header: "Год релиза",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const content = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <Link href={`/dashboard/content/edit/${content.id}`}>
              <DropdownMenuItem>
                <SquarePen />
                Редактировать
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem variant="destructive">
              <Trash2 />
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
