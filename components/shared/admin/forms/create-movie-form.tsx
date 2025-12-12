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
import { Textarea } from "@/components/ui/text-area";
import {
  ContentType,
  useCreateContentMutation,
  useCreateMovieMutation,
  useFindAllActorsQuery,
  useFindAllGenresQuery,
} from "@/graphql/generated/output";
import {
  createMovieSchema,
  TypeCreateMovieSchema,
} from "@/schemas/admin/create-movie.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UploadDropzone } from "../../upload-dropzone";
import { MultiSelect } from "@/components/ui/multi-select";
import { NumberInput } from "@/components/ui/number-input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export const CreateMovieForm = () => {
  const { toast } = useToast();
  const router = useRouter()
  const [createContent, { loading: loadingContent }] = useCreateContentMutation(
    {
      onCompleted(data) {
        createMovie({
          variables: {
            contentId: data.createContent,
          },
        });
      },
    }
  );
  const [createMovie, { loading: loadingMovie }] = useCreateMovieMutation({
    onCompleted() {
      toast({
        title: 'Успех',
        description: 'Фильм создан',
        variant: "success"
      })
      router.push('/dashboard/content')
    },
    onError(err) {
      toast({
        title: 'Ошибка',
        description: err.message,
        variant: "error"
      })
    }
  });

  const isLoading = loadingContent || loadingMovie;

  const { data: actorsData } = useFindAllActorsQuery();

  const actors = actorsData?.findAllActors ?? [];

  const { data: genresData } = useFindAllGenresQuery();

  const genres = genresData?.findAllGenres ?? [];

  const form = useForm<TypeCreateMovieSchema>({
    resolver: zodResolver(createMovieSchema),
    defaultValues: {
      title: "",
      poster: "",
      actorsIds: [],
      description: "",
      genresIds: [],
      releaseYear: 2025,
    },
  });

  function onSubmit(data: TypeCreateMovieSchema) {
    createContent({
      variables: {
        data: {
          title: data.title,
          type: ContentType.Movie,
          description: data.description,
          releaseYear: data.releaseYear,
          actorIds: data.actorsIds,
          genresIds: data.genresIds,
        },
        poster: data.poster,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        className="space-y-4 w-1/2"
      >
        <h1 className="text-4xl font-black">Создание фильма</h1>
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
          name="poster"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Постер</FormLabel>
              <FormControl>
                {/* @ts-ignore */}
                <UploadDropzone value={field.value} onChange={field.onChange} />
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
          name="actorsIds"
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
          name="genresIds"
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

        <Button type="submit" isLoading={isLoading}>
          Создать
        </Button>
      </form>
    </Form>
  );
};
