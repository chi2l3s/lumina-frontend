"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const DownloadDialog = () => {
  const [open, setOpen] = useState(false);

  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) setOpen(true);
    else setOpen(false);
  }, [isMobile]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Скачайте наше мобильное приложение</DialogTitle>
          <DialogDescription>
            С нашим приложением просмотр фильмов станет намного удобнее
          </DialogDescription>
        </DialogHeader>
        <div>
          <img src={"/download.png"} alt="Скачать" className="rounded-md" />
        </div>
        <div className="flex items-center justify-end gap-2">
          <Link href={"/download"}>
            <Button onClick={() => setOpen(false)}>Скачать</Button>
          </Link>
          <Button onClick={() => setOpen(false)} variant={"outline"}>
            Динах
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
