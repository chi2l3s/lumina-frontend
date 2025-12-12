"use client";

import { useEffect, useMemo, useState } from "react";
import {
  StreamVideoProcessSubscription,
  useStreamVideoProcessSubscription,
} from "@/graphql/generated/output";

interface VideoProcessProps {
  jobId: string;
}

type Status = "pending" | "processing" | "completed" | "failed" | "canceled";

type SubscriptionEvent =
  StreamVideoProcessSubscription["videoJobProgress"];

interface QualityState {
  percent: number;
  speed: string | null;
  status: Status;
}

export const VideoProcess = ({ jobId }: VideoProcessProps) => {
  const { data } = useStreamVideoProcessSubscription({
    variables: { jobId },
  });

  const [qualities, setQualities] = useState<Record<string, QualityState>>({});
  const [globalStatus, setGlobalStatus] = useState<Status>("processing");

  useEffect(() => {
    const event = data?.videoJobProgress as SubscriptionEvent | undefined;
    if (!event) return;

    const status = (event.status as Status) || "processing";
    const qualityKey = event.quality || "global";

    setQualities((prev) => {
      const prevEntry = prev[qualityKey] ?? {
        percent: 0,
        speed: null,
        status: "processing" as Status,
      };

      return {
        ...prev,
        [qualityKey]: {
          percent: event.percent ?? prevEntry.percent,
          speed: event.speed ?? prevEntry.speed,
          status,
        },
      };
    });

    if (
      status === "completed" ||
      status === "failed" ||
      status === "canceled"
    ) {
      setGlobalStatus(status);
    } else {
      setGlobalStatus("processing");
    }
  }, [data]);

  const overallPercent = useMemo(() => {
    const values = Object.values(qualities);
    if (!values.length) return 0;
    const sum = values.reduce((acc, item) => acc + (item.percent || 0), 0);
    return Math.round(sum / values.length);
  }, [qualities]);

  const statusLabel = useMemo(() => {
    switch (globalStatus) {
      case "processing":
        return "Обработка";
      case "completed":
        return "Готово";
      case "failed":
        return "Ошибка";
      case "canceled":
        return "Отменено";
      case "pending":
      default:
        return "В очереди";
    }
  }, [globalStatus]);

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Статус обработки видео
          </h2>
          <p className="text-xs text-white/50 mt-1 break-all">
            Job ID: <span className="text-white/70">{jobId}</span>
          </p>
        </div>

        <div
          className={[
            "px-3 py-1 rounded-full text-xs font-medium border",
            "flex items-center gap-2",
            globalStatus === "completed" && "border-emerald-400/40 bg-emerald-500/10 text-emerald-200",
            globalStatus === "processing" && "border-amber-400/40 bg-amber-500/10 text-amber-200",
            globalStatus === "failed" && "border-red-400/40 bg-red-500/10 text-red-200",
            globalStatus === "canceled" && "border-sky-400/40 bg-sky-500/10 text-sky-200",
            globalStatus === "pending" && "border-white/20 bg-white/5 text-white/70",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-current" />
          <span>{statusLabel}</span>
          <span className="text-[10px] opacity-70">{overallPercent}%</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-[#F4FFB4] transition-all duration-300"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/60">
          <span>Общий прогресс</span>
          <span>{overallPercent}%</span>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
          Качества
        </p>

        {Object.keys(qualities).length === 0 && (
          <div className="rounded-xl border border-dashed border-white/15 bg-white/5 px-4 py-6 text-sm text-white/60 text-center">
            Ожидание первых обновлений прогресса…
          </div>
        )}

        <div className="flex flex-col gap-3">
          {Object.entries(qualities)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([quality, info]) => (
              <div
                key={quality}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 space-y-2"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 text-[11px] font-medium text-white/80 border border-white/15">
                      {quality === "global" ? "Общий" : quality}
                    </span>
                    {info.speed && (
                      <span className="text-[11px] text-white/50">
                        скорость {info.speed}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-white/70">
                    {Math.round(info.percent)}%
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-[#F4FFB4] transition-all duration-300"
                    style={{ width: `${info.percent}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-white/45">
                  <span>
                    {info.status === "processing" && "Идёт обработка"}
                    {info.status === "completed" && "Готово"}
                    {info.status === "failed" && "Ошибка при обработке"}
                    {info.status === "canceled" && "Обработка отменена"}
                    {info.status === "pending" && "В очереди"}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
