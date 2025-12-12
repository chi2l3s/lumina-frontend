"use client";

import { useFindAllProcessingJobsQuery } from "@/graphql/generated/output";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function DashboardProcessingPage() {
  const { data, loading } = useFindAllProcessingJobsQuery();

  const jobs = data?.findAllProcessingJobs ?? [];

  return <DataTable columns={columns} data={jobs} />;
}
