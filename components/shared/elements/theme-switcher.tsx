"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenuItem
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <SunMedium /> : <Moon />}
      {theme === "dark" ? "Светлая" : "Тёмная"} тема
    </DropdownMenuItem>
  );
};
