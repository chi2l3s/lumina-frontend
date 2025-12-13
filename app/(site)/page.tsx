import { Container } from "@/components/shared/layout/container";
import { ContentCarousel } from "@/components/shared/main/content-carousel";
import { ContentList } from "@/components/shared/main/content-list";
import { akonyFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="w-full flex flex-col space-y-4 md:space-y-6">
      <ContentCarousel />
      <Container className="space-y-2 md:space-y-4 pb-8">
        <h1
          className={cn(akonyFont.className, "text-xl md:text-2xl lg:text-3xl")}
        >
          На основе ваших предпочтений
        </h1>
        <ContentList />
      </Container>
    </main>
  );
}
