"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatedAvatar } from "../elements/animated-avatar";
import { Airplay, LogOut, Star, User } from "lucide-react";
import { ThemeSwitcher } from "../elements/theme-switcher";
import { useRouter } from "next/navigation";
import { useLogOutUserMutation } from "@/graphql/generated/output";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/components/ui/toast";
import { useCurrent } from "@/hooks/use-current";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const UserMenu = () => {
  const { user, isLoadingProfile } = useCurrent();
  const { toast } = useToast();
  const router = useRouter();
  const { exit } = useAuth();

  const [logout] = useLogOutUserMutation({
    onCompleted() {
      exit();
      toast({
        title: "Успех",
        description: "Вы вышли из аккаунта",
        variant: "success",
      });
      router.push("/auth/login");
    },
    onError(err) {
      toast({
        title: "Ошибка",
        description: err.message,
        variant: "error",
      });
    },
  });

  if (isLoadingProfile) {
    return (
      <Skeleton className="h-11 w-20" />
    )
  }

  if (!user) {
    return (
      <Link href={'/auth/login'}>
        <Button variant={"outline"}>Войти</Button>
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AnimatedAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/account" className="flex items-center gap-2">
              <User />
              Мой аккаунт
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Star />
            Оценки
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Airplay />
            Управление подпиской
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ThemeSwitcher />
          <DropdownMenuItem variant="destructive" onClick={() => logout()}>
            <LogOut />
            Выйти из аккаунта
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
