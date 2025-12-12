"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import {
  FindContentByIdQuery,
  useIsContentFavoriteQuery,
  useSetContentFavoriteMutation,
} from "@/graphql/generated/output";
import { IoBookmarks, IoPlay, IoHeart } from "react-icons/io5";
import { motion } from "motion/react";
import { TfiMoreAlt } from "react-icons/tfi";
import Link from "next/link";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/toast";

interface ContentTabsProps {
  content: FindContentByIdQuery["findContentById"];
}

export const ContentTabs = ({ content }: ContentTabsProps) => {
  const { toast } = useToast();
  const isMovie = content.movie?.id !== null;

  const { data } = useIsContentFavoriteQuery({
    variables: {
      contentId: content.id,
    },
  });

  const [isFavorite, setIsFavorite] = useState(false);
  const [favBurst, setFavBurst] = useState(false);

  const [setFavoriteMutation] = useSetContentFavoriteMutation({
    onCompleted() {
      toast({
        title: `Фильм ${
          isFavorite ? "добавлен в избранное" : "удалён из избранного"
        }`,
        variant: "info",
      });
    },
  });

  function onClick() {
    const newValue = !isFavorite;

    setIsFavorite(newValue);
    setFavoriteMutation({
      variables: {
        data: {
          value: newValue,
          contentId: content.id,
        },
      },
    });

    if (newValue) {
      setFavBurst(true);
      setTimeout(() => setFavBurst(false), 650);
    }
  }

  useEffect(() => {
    if (typeof data?.isContentFavorite === "boolean") {
      setIsFavorite(data.isContentFavorite);
    }
  }, [data]);

  return (
    <div className="h-full">
      <Tabs defaultValue="about" className="h-full flex flex-col">
        <div className="flex justify-center pt-6">
          <TabsList>
            <TabsTab value="about" className={"px-4 py-3"}>
              {isMovie ? "О фильме" : "О сериале"}
            </TabsTab>
            {!isMovie && (
              <TabsTab value="episodes" className={"px-4 py-3"}>
                Сезоны и серии
              </TabsTab>
            )}
            <TabsTab value="details" className={"px-4 py-3"}>
              Детали
            </TabsTab>
          </TabsList>
        </div>

        <TabsPanel value="about" className="flex-1 flex items-center mt-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
            }}
          >
            <div className="ml-24 flex flex-col gap-3 max-w-2xl">
              <p className="text-lg font-medium text-neutral-300">
                {content.releaseYear}
                {", "}
                {content.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className="text-2xl font-medium max-w-[60ch] text-white">
                {content.description}
              </p>
              <div className="flex items-center gap-x-2 mt-2">
                <Link href={`/watch/${content.id}`}>
                  <Button className="px-9 font-semibold">
                    <IoPlay />
                    Смотреть
                  </Button>
                </Link>

                <div className="relative">
                  <motion.div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                    initial={false}
                    animate={
                      favBurst
                        ? {
                            opacity: [0, 0.9, 0],
                            scale: [0.8, 1.3, 1.6],
                          }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <div className="rounded-full bg-rose-500/30 blur-md w-12 h-12" />
                  </motion.div>

                  <Toggle
                    size={"lg"}
                    variant={"default"}
                    pressed={isFavorite}
                    onPressedChange={onClick}
                    className="relative data-[state=on]:*:[svg]:fill-rose-500 data-[state=on]:bg-white bg-primary hover:bg-primary/80 size-13 cursor-pointer"
                  >
                    <IoBookmarks className="size-6" />
                  </Toggle>

                  <motion.div
                    initial={false}
                    animate={
                      favBurst
                        ? {
                            opacity: [0, 1, 0],
                            y: [0, -18, -32],
                            scale: [0.7, 1.1, 1],
                          }
                        : { opacity: 0, y: 0, scale: 0.7 }
                    }
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  >
                    <div className="relative">
                      <IoHeart className="size-7 text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                      <IoHeart className="size-4 text-rose-400 absolute -top-3 -left-3 opacity-80" />
                      <IoHeart className="size-4 text-rose-400 absolute -top-4 -right-2 opacity-70" />
                    </div>
                  </motion.div>
                </div>

                <Button variant={"secondary"} size={"icon-lg"}>
                  <TfiMoreAlt className="size-6" />
                </Button>
              </div>
            </div>
          </motion.div>
        </TabsPanel>

        <TabsPanel value="episodes" className="flex-1 mt-0"></TabsPanel>

        <TabsPanel value="details" className="flex-1 flex mt-0 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
            }}
            className="mx-24 flex w-full justify-between items-start"
          >
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium text-neutral-300">
                {content.releaseYear}
                {", "}
                {content.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className="text-2xl font-medium max-w-[60ch] text-white">
                {content.description}
              </p>
            </div>

            <div className="flex items-start justify-end gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col space-y-2">
                  <h2 className="text-white font-bold text-xl">
                    В главных ролях
                  </h2>
                  {content.actors.map((actor) => (
                    <Link
                      href={`/actor/${actor.id}`}
                      key={actor.id}
                      className="text-white/70 text-base hover:text-primary duration-300"
                    >
                      {actor.name}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col space-y-2">
                  <h2 className="text-white font-bold text-xl">Режиссёры</h2>
                  <p className="text-white/70 text-base">Даун Писюнвротович</p>
                  <p className="text-white/70 text-base">Попуск</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col space-y-2">
                  <h2 className="text-white font-bold text-xl">Аудиодорожки</h2>
                  <p className="text-white/70 text-base">Русский</p>
                  <p className="text-muted text-base">Стерео</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <h2 className="text-white font-bold text-xl">Субтитры</h2>
                  <p className="text-white/70 text-base">Нахуй не нужны</p>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsPanel>
      </Tabs>
    </div>
  );
};
