"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, Play, Star, Zap, Apple, ChevronDown, Sparkles, Film, Tv } from "lucide-react"

const platforms = [
  {
    id: "android",
    name: "Android",
    description: "Гибкая установка через APK с офлайн-режимом.",
    version: "Android 9+",
    size: "65 MB",
    primaryCta: "Скачать APK",
    primaryHref: "https://github.com/chi2l3s/lumina-native/releases/download/1.0.1/application-85ea194d-66a7-4a0c-9963-b752c31c5620.apk",
    secondaryCta: "Google Play",
    secondaryHref: "https://play.google.com",
  },
  {
    id: "ios",
    name: "iOS",
    description: "Синхронизация с iCloud и плавные жесты.",
    version: "iOS 15+",
    size: "48 MB",
    primaryCta: "App Store",
    primaryHref: "https://apps.apple.com",
    secondaryCta: "TestFlight",
    secondaryHref: "https://testflight.apple.com",
  },
]

export default function DownloadPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic animated gradient background */}
        <div
          className="absolute inset-0 opacity-40 transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              hsl(var(--primary) / 0.4) 0%, 
              hsl(var(--secondary) / 0.3) 25%,
              hsl(var(--accent) / 0.2) 50%, 
              transparent 80%)`,
            transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px)`,
          }}
        />

        {/* Animated mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%),radial-gradient(ellipse_at_bottom,hsl(var(--secondary)/0.15),transparent_50%)]" />

        {/* Grid with perspective */}
        <div
          className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.05)_2px,transparent_2px),linear-gradient(90deg,hsl(var(--primary)/0.05)_2px,transparent_2px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,black_40%,transparent_100%)]"
          style={{
            transform: `perspective(1000px) rotateX(${scrollY * 0.01}deg) translateY(${scrollY * 0.1}px)`,
          }}
        />

        {/* Floating orbs with depth */}
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse opacity-30"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
            transform: `translate(${(mousePosition.x - 0.5) * -50}px, ${(mousePosition.y - 0.5) * -50}px) scale(${1 + scrollY * 0.0001})`,
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse opacity-30"
          style={{
            background: "radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 70%)",
            animationDelay: "1s",
            transform: `translate(${(mousePosition.x - 0.5) * 50}px, ${(mousePosition.y - 0.5) * 50}px) scale(${1 + scrollY * 0.0001})`,
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:py-32 text-center">
          {/* Badge with glow */}
          <div
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-background/40 px-8 py-4 backdrop-blur-2xl shadow-[0_0_50px_hsl(var(--primary)/0.3)] transition-all hover:scale-105 hover:shadow-[0_0_80px_hsl(var(--primary)/0.5)]"
            style={{
              transform: `translateY(${scrollY * -0.2}px)`,
            }}
          >
            <Sparkles className="size-6 text-primary animate-pulse" />
            <span className="text-lg font-bold">Более 1M скачиваний</span>
          </div>

          <h1
            className="mb-12 text-balance font-black leading-[0.85] tracking-tighter"
            style={{
              fontSize: "clamp(4rem, 20vw, 16rem)",
              transform: `translateY(${scrollY * -0.1}px)`,
            }}
          >
            <span className="block bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
              Кино
            </span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              в твоём
            </span>
            <span className="block bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
              кармане
            </span>
          </h1>

          <p
            className="mx-auto mb-16 max-w-4xl text-balance text-2xl font-light leading-relaxed text-muted-foreground lg:text-4xl"
            style={{
              transform: `translateY(${scrollY * -0.05}px)`,
            }}
          >
            Премьеры и легендарное кино в одном приложении.
            <br />
            <span className="text-foreground/90 font-medium">Смотри где угодно, когда угодно.</span>
          </p>

          <div
            className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center mb-24"
            style={{
              transform: `translateY(${scrollY * -0.03}px)`,
            }}
          >
            <Button
              asChild
              size="lg"
              className="group relative h-24 overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent px-16 text-2xl font-black shadow-[0_0_60px_hsl(var(--primary)/0.6)] transition-all hover:scale-110 hover:shadow-[0_0_100px_hsl(var(--primary)/0.9)] active:scale-105"
            >
              <Link href="#android">
                <span className="relative z-10 flex items-center gap-4">
                  <Download className="size-8" />
                  Скачать сейчас
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-24 rounded-3xl border-2 border-primary/30 bg-background/20 px-16 text-2xl font-black backdrop-blur-2xl transition-all hover:scale-110 hover:border-primary/60 hover:bg-background/30 hover:shadow-[0_0_60px_hsl(var(--primary)/0.4)]"
            >
              <Link href="#features">
                <Play className="mr-4 size-8" />
                Смотреть трейлер
              </Link>
            </Button>
          </div>

          <div
            className="grid grid-cols-3 gap-8 lg:gap-24"
            style={{
              transform: `translateY(${scrollY * 0.05}px)`,
            }}
          >
            {[
              { value: "50K+", label: "Фильмов", icon: Film },
              { value: "4K", label: "Качество", icon: Tv },
              { value: "HDR", label: "Поддержка", icon: Star },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="group cursor-default transition-all duration-500 hover:scale-125"
                style={{
                  transform: `translateY(${Math.sin((scrollY + i * 100) * 0.01) * 10}px)`,
                }}
              >
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary blur-2xl opacity-0 transition-opacity group-hover:opacity-60" />
                  <stat.icon className="relative mx-auto size-16 lg:size-24 text-primary transition-transform group-hover:rotate-12" />
                </div>
                <div className="text-6xl font-black lg:text-9xl bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent transition-all group-hover:from-primary group-hover:to-secondary">
                  {stat.value}
                </div>
                <div className="mt-4 text-xl lg:text-3xl text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="size-12 text-primary/40" />
        </div>
      </section>

      <section id="features" className="relative py-32 lg:py-48">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <h2 className="mb-8 text-center font-black tracking-tight" style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}>
            <span className="block bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Всё для идеального
            </span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              просмотра
            </span>
          </h2>
          <p className="mx-auto mb-24 max-w-3xl text-center text-2xl lg:text-3xl text-muted-foreground font-light">
            Технологии премиум-класса для незабываемого опыта
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "4K качество",
                desc: "HDR10+, Dolby Vision и стабильный битрейт на любом соединении",
                gradient: "from-primary to-secondary",
              },
              {
                icon: Star,
                title: "Синхронизация",
                desc: "История просмотра и избранное автоматически синхронизируются",
                gradient: "from-secondary to-accent",
              },
              {
                icon: Download,
                title: "Офлайн-режим",
                desc: "Загружайте любимые фильмы и смотрите без интернета",
                gradient: "from-accent to-primary",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-background/80 to-background/40 p-12 backdrop-blur-2xl border border-primary/10 transition-all duration-700 hover:scale-105 hover:border-primary/30 hover:shadow-[0_0_80px_hsl(var(--primary)/0.3)]"
                style={{
                  transform: `translateY(${Math.sin((scrollY + index * 200) * 0.005) * 20}px)`,
                }}
              >
                {/* Gradient glow on hover */}
                <div
                  className={`absolute -top-40 -right-40 size-80 bg-gradient-to-br ${feature.gradient} opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-40`}
                />

                <div
                  className={`mb-8 inline-flex size-24 items-center justify-center rounded-3xl bg-gradient-to-br ${feature.gradient} shadow-[0_20px_60px_hsl(var(--primary)/0.4)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_30px_90px_hsl(var(--primary)/0.6)]`}
                >
                  <feature.icon className="size-12 text-white" />
                </div>
                <h3 className="mb-6 text-4xl font-black">{feature.title}</h3>
                <p className="text-xl leading-relaxed text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 lg:py-48">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-32 text-center font-black" style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}>
            <span className="block bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Доступно на всех
            </span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              платформах
            </span>
          </h2>

          <div className="space-y-48 lg:space-y-64">
            {platforms.map((platform, index) => (
              <div
                key={platform.id}
                id={platform.id}
                className={`grid items-center gap-16 lg:gap-24 lg:grid-cols-2 ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
              >
                {/* Screenshot with depth */}
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""} group`}>
                  <div className="relative overflow-hidden rounded-3xl shadow-[0_0_100px_hsl(var(--primary)/0.4)] transition-all duration-700 hover:scale-105 hover:shadow-[0_0_150px_hsl(var(--primary)/0.7)] hover:-rotate-2">
                    <img
                      src={`/.jpg?height=1400&width=1800&query=${platform.name} premium cinema app interface dark mode modern streaming ui 4k`}
                      alt={`${platform.name} интерфейс`}
                      className="w-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div className="mb-12 flex items-center gap-8">
                    <div
                      className={`rounded-3xl bg-gradient-to-br ${index === 0 ? "from-primary to-secondary" : "from-accent to-primary"} p-8 shadow-[0_20px_60px_hsl(var(--primary)/0.5)]`}
                    >
                      {platform.id === "android" ? (
                        <Download className="size-16 text-white" />
                      ) : (
                        <Apple className="size-16 text-white" />
                      )}
                    </div>
                    <h3 className="font-black" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
                      {platform.name}
                    </h3>
                  </div>

                  <p className="mb-12 text-3xl leading-relaxed text-muted-foreground font-light lg:text-4xl">
                    {platform.description}
                  </p>

                  <div className="mb-12 flex gap-16">
                    <div>
                      <div className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Версия</div>
                      <div className="mt-3 text-3xl font-black">{platform.version}</div>
                    </div>
                    <div>
                      <div className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Размер</div>
                      <div className="mt-3 text-3xl font-black">{platform.size}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6">
                    <Button
                      asChild
                      size="lg"
                      className={`h-20 rounded-2xl bg-gradient-to-r ${index === 0 ? "from-primary to-secondary" : "from-accent to-primary"} px-12 text-xl font-black shadow-[0_20px_60px_hsl(var(--primary)/0.5)] transition-all hover:scale-110 hover:shadow-[0_30px_90px_hsl(var(--primary)/0.7)]`}
                    >
                      <Link href={platform.primaryHref} target="_blank" rel="noreferrer">
                        {platform.primaryCta}
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-20 rounded-2xl border-2 border-primary/30 bg-background/20 px-12 text-xl font-black backdrop-blur-2xl hover:scale-110 hover:border-primary/60 hover:bg-background/30"
                    >
                      <Link href={platform.secondaryHref} target="_blank" rel="noreferrer">
                        {platform.secondaryCta}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-primary/10 bg-background/50 backdrop-blur-xl py-24">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div className="mb-10 flex flex-wrap items-center justify-center gap-8 text-lg text-muted-foreground font-medium">
            <span>Без рекламы</span>
            <span className="text-primary/30">·</span>
            <span>Dolby Vision</span>
            <span className="text-primary/30">·</span>
            <span>HDR10+</span>
            <span className="text-primary/30">·</span>
            <span>Dolby Atmos</span>
          </div>
          <p className="text-muted-foreground/60 text-base">© 2025 Lumina. Все права защищены.</p>
        </div>
      </footer>
    </main>
  )
}
