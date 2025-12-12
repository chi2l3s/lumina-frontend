"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProcessingStatus } from "@/graphql/generated/output";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import Link from "next/link";

export type ProcessingJob = {
  id: string;
  jobId: string;
  status: ProcessingStatus;
  progress?: string | null | undefined;
  error?: string | null | undefined;
};

function mapStatus(status: ProcessingStatus) {
  switch (status) {
    case ProcessingStatus.Completed:
      return "Завершено";
    case ProcessingStatus.Processing:
      return "В процессе";
    case ProcessingStatus.Pending:
      return "В очереди";
    case ProcessingStatus.Cancelled:
      return "Отменено";
    case ProcessingStatus.Failed:
      return "Ошибка";
  }
}

export const columns: ColumnDef<ProcessingJob>[] = [
  {
    accessorKey: "jobId",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      return mapStatus(row.getValue("status"));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const job = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <Link href={`/dashboard/processing/${job.jobId}`}>
              <DropdownMenuItem>
                <SquareArrowOutUpRight />
                Открыть
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              variant="destructive"
              disabled={job.status === ProcessingStatus.Completed}
            >
              <Trash2 />
              Отменить процесс
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
