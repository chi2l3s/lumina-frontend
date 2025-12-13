"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";
import { GlassButton } from "../auth/glass-button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import { useSearchContentQuery } from "@/graphql/generated/output";
import Image from "next/image";
import { getMediaSource } from "@/utils/get-media-source";
import Link from "next/link";

export const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });

  const { data, loading, refetch } = useSearchContentQuery({
    variables: {
      query: searchQuery,
    },
  });

  useClickAway(containerRef, () => {
    setFocused(false);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useDebounce(
    () => {
      if (searchQuery.trim()) {
        refetch();
      }
    },
    500,
    [searchQuery]
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery("");
  };

  useEffect(() => {
    if (focused && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        top: rect.top + rect.height / 2,
        right: window.innerWidth - rect.left,
      });
    }
  }, [focused]);

  return (
    <>
      {mounted && focused && (
        <>
          {createPortal(
            <div className="fixed inset-0 bg-black/50 z-[100]" />,
            document.body
          )}
          {createPortal(
            <div
              ref={containerRef}
              className="fixed z-[110]"
              style={{ top: buttonPosition.top, right: buttonPosition.right }}
            >
              <AnimatePresence>
                <motion.div
                  key="search-input"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 500, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 overflow-visible"
                >
                  <div className="relative w-full">
                    <Input
                      autoFocus
                      type="text"
                      placeholder="Поиск контента"
                      className="w-full pl-9 bg-white text-black dark:bg-white dark:text-black font-semibold text-xl h-11 shadow-lg"
                      onChange={(e) => setSearchQuery(e.target.value)}
                      value={searchQuery}
                    />
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black z-10" />

                    {searchQuery.trim() && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-xl max-h-[400px] overflow-y-auto">
                        {loading ? (
                          <div className="p-4 text-center text-muted-foreground">
                            Загрузка...
                          </div>
                        ) : data?.searchContent &&
                          data.searchContent.length > 0 ? (
                          <div className="py-2">
                            {data.searchContent.map((item) => (
                              <Link
                                key={item.id}
                                href={`/movie/${item.id}`}
                                onClick={onClickItem}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-100 hover:text-accent-foreground cursor-pointer transition-colors"
                              >
                                {item.posterUrl && (
                                  <div className="relative w-12 h-16 flex-shrink-0 rounded overflow-hidden">
                                    <Image
                                      src={getMediaSource(item.posterUrl)}
                                      alt={item.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-black truncate">
                                    {item.title}
                                  </h3>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : searchQuery.trim() ? (
                          <div className="p-4 text-center text-muted-foreground">
                            Ничего не найдено
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>,
            document.body
          )}
        </>
      )}

      <GlassButton
        ref={buttonRef}
        size="icon"
        className="h-10 w-10 p-0 relative z-[110]"
        onClick={() => setFocused((prev) => !prev)}
      >
        {focused ? <X /> : <Search />}
      </GlassButton>
    </>
  );
};
