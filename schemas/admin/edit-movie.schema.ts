import z from "zod";
import { MAX_FILE_SIZE } from "./create-movie.schema";

export const editMovieSchema = z.object({
  title: z.string(),
  description: z.string(),
  releaseYear: z.number(),
  actorIds: z.array(z.string()),
  genreIds: z.array(z.string()),
  poster: z
    .union([
      z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
  backdrop: z
    .union([
      z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

export type TypeEditMovieSchema = z.infer<typeof editMovieSchema>