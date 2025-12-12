"use client";

import { useEffect, useRef, useState } from "react";
import { akonyFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { GlassButton } from "../auth/glass-button";
import { UserMenu } from "./user-menu";
import { SearchInput } from "../main/search-input";
import { Container } from "./container";

export const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [withBackground, setWithBackground] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScrollY.current && current > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setWithBackground(current > 10);
      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-out",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <Container>
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4 lg:py-6">
          <div className="flex items-center justify-center gap-x-4">
            <Image src={"/logo.png"} alt="Lumina" width={71} height={75} />
            <h2
              className={cn(
                akonyFont.className,
                "text-3xl lg:text-5xl"
              )}
            >
              LUMINA
            </h2>
          </div>

          <div className="flex items-center justify-center gap-x-4 lg:gap-x-[30px]">
            <GlassButton>Главное</GlassButton>
            <GlassButton>Моё</GlassButton>
            <SearchInput />
          </div>

          <UserMenu />
        </div>
      </Container>
    </header>
  );
};
