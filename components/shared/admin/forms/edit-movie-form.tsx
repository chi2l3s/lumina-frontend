"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { Textarea } from "@/components/ui/text-area";
import {
  FindContentByIdQuery,
  useEditMovieMutation,
  useFindAllActorsQuery,
  useFindAllGenresQuery,
} from "@/graphql/generated/output";
import {
  editMovieSchema,
  TypeEditMovieSchema,
} from "@/schemas/admin/edit-movie.schema";
import { getMediaSource } from "@/utils/get-media-source";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UploadDropzone } from "../../upload-dropzone";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { MultiSelect } from "@/components/ui/multi-select";

interface EditMovieFormProps {
  content: FindContentByIdQuery["findContentById"];
}

export const EditMovieForm = ({ content }: EditMovieFormProps) => {
  const { toast } = useToast();
  const [edit, { loading: isLoadingEdit }] = useEditMovieMutation({
    onCompleted() {
      toast({
        title: "Успех",
        description: "Изменения сохранены",
        variant: "success",
      });
    },
  });

  const { data: actorsData } = useFindAllActorsQuery();

  const actors = actorsData?.findAllActors ?? [];

  const { data: genresData } = useFindAllGenresQuery();

  const genres = genresData?.findAllGenres ?? [];

  const form = useForm<TypeEditMovieSchema>({
    resolver: zodResolver(editMovieSchema),
    values: {
      title: content.title,
      description: content.description ?? "",
      releaseYear: content.releaseYear ?? 2025,
      backdrop: getMediaSource(content.backdropUrl) ?? "",
      poster: getMediaSource(content.posterUrl) ?? "",
      actorIds: content.actors.map((actor) => actor.id),
      genreIds: content.genres.map((genre) => genre.id),
    },
  });

  function onSubmit(data: TypeEditMovieSchema) {
    const { poster, backdrop, ...rest } = data;

    edit({
      variables: {
        data: {
          title: rest.title,
          description: rest.description,
          releaseYear: rest.releaseYear,
          contentId: content.id,
          id: content.movie?.id!,
          genresIds: rest.genreIds,
          actorIds: rest.actorIds,
        },
        poster: poster instanceof File ? poster : undefined,
        backdrop: backdrop instanceof File ? backdrop : undefined,
      },
    });
  }

  const { isDirty, isValid } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название фильма</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание фильма</FormLabel>
              <FormControl>
                <Textarea {...field} className="max-h-[500px]" />
              </FormControl>
              <FormDescription>Подробное описание для фильма</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="releaseYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Год релиза</FormLabel>
              <FormControl>
                <NumberInput {...field} />
              </FormControl>
              <FormDescription>В каком году был выпущен фильм</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="actorIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Актёры</FormLabel>
              <FormControl>
                <MultiSelect
                  options={actors.map((actor) => ({
                    name: actor.name,
                    value: actor.id,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Выберите актёров"
                  searchPlaceholder="Поиск актёров"
                />
              </FormControl>
              <FormDescription>
                Выберите актёров, снявшихся в этом фильме
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genreIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Жанры</FormLabel>
              <FormControl>
                <MultiSelect
                  options={genres.map((genre) => ({
                    name: genre.name,
                    value: genre.id,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Выберите жанры"
                  searchPlaceholder="Поиск жанров"
                />
              </FormControl>
              <FormDescription>
                Выберите жанры, относящиеся к этому контенту
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-x-4">
          <FormField
            control={form.control}
            name="poster"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Постер</FormLabel>
                <FormControl>
                  <UploadDropzone
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Постер, который будет отображаться в каталоге среди фильмов
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="backdrop"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Задний фон</FormLabel>
                <FormControl>
                  <UploadDropzone
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Фотография будет отображаться на страничке фильма
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          isLoading={isLoadingEdit}
          disabled={!isDirty || !isValid}
        >
          Сохранить
        </Button>
      </form>
    </Form>
  );
};
