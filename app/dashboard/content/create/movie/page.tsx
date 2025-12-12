import { CreateMovieForm } from "@/components/shared/admin/forms/create-movie-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Создание фильма",
};

export default function Page() {
  return <CreateMovieForm />;
}
