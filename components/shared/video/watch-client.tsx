"use client";

import { useEffect, useRef, useState } from "react";
import { VideoPlayer } from "./video-player";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface WatchClientProps {
  contentId: string;
  contentType: "movie" | "episode";
  title: string;
  subtitle?: string;
}

interface WatchTokenResponse {
  token: string;
  expiresIn: number;
  progress: number;
  streamUrl: string;
}

export const WatchClient = ({
  contentId,
  contentType,
  title,
  subtitle,
}: WatchClientProps) => {
  const [src, setSrc] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [initialTime, setInitialTime] = useState<number>(0);
  const [resumeTime, setResumeTime] = useState<number>(0);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const lastSentRef = useRef(0);

  const router = useRouter();

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/video/watch/${contentType}/${contentId}/token`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to generate watch token: ${res.status}`);
        }

        const data: WatchTokenResponse = await res.json();
        if (cancelled) return;

        setSrc(data.streamUrl);
        setToken(data.token);

        if (data.progress && data.progress > 5) {
          setResumeTime(data.progress);
          setInitialTime(0);
          setShowResumePrompt(true);
        } else {
          setInitialTime(data.progress || 0);
        }

        setLoading(false);
      } catch (e: any) {
        if (cancelled) return;
        setError(e.message ?? "Не удалось инициализировать видео");
        setLoading(false);
      }
    };

    void init();

    return () => {
      cancelled = true;
    };
  }, [contentId, contentType]);

  const handleTimeUpdate = async (currentTime: number, duration: number) => {
    if (!token) return;
    const now = Date.now();
    if (now - lastSentRef.current < 5000) return;
    lastSentRef.current = now;

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/video/progress?token=${encodeURIComponent(
          token
        )}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ currentTime, duration }),
        }
      );
    } catch (e) {
      console.error("Failed to update progress", e);
    }
  };

  if (error) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  if (loading || !src) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-neutral-400">
        Загрузка плеера...
      </div>
    );
  }

  if (showResumePrompt && resumeTime > 0) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-6 max-w-md w-full shadow-2xl backdrop-blur-md">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-neutral-400 mb-1">
                Продолжить просмотр
              </p>
              <h2 className="text-lg font-semibold text-white line-clamp-2">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm text-neutral-400 mt-1">{subtitle}</p>
              )}
            </div>

            <p className="text-sm text-neutral-300">
              Ты остановился примерно на{" "}
              <span className="font-semibold text-white">
                {formatTime(resumeTime)}
              </span>
              . Как хочешь начать?
            </p>

            <div className="flex justify-end gap-3 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setInitialTime(0);
                  setShowResumePrompt(false);
                }}
              >
                Начать сначала
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setInitialTime(resumeTime);
                  setShowResumePrompt(false);
                }}
              >
                Продолжить
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <VideoPlayer
      src={`${process.env.NEXT_PUBLIC_API_URL}${src}`}
      title={title}
      subtitle={subtitle}
      initialTime={initialTime}
      onTimeUpdate={handleTimeUpdate}
      onClose={router.back}
    />
  );
};
