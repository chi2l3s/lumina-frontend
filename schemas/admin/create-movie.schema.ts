import z from "zod";

export const MAX_FILE_SIZE = 2000 * 1024 * 1024;

export const createMovieSchema = z.object({
  title: z.string().min(1, { message: 'Введите название фильма' }),
  description: z.string().min(1, { message: 'Введите описание фильма' }),
  releaseYear: z.number().min(4, { message: 'Введите год релиза фильма' }),
  poster: z
    .union([
      z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
  genresIds: z.array(z.string()).min(1, { message: 'Выберите хотя бы один жанр' }),
  actorsIds: z.array(z.string()).min(1, { message: 'Выберите хотя бы одного актёра' }),
});

export type TypeCreateMovieSchema = z.infer<typeof createMovieSchema>;
