"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import Hls from "hls.js";
import { IoPlay } from "react-icons/io5";
import {
  TbPlayerPauseFilled,
  TbRewindBackward10,
  TbRewindForward10,
} from "react-icons/tb";
import {
  MdClose,
  MdHighQuality,
  MdOutlineSpeed,
  MdSettings,
} from "react-icons/md";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { LuVolume2, LuVolumeX } from "react-icons/lu";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCompress,
  FaExpand,
} from "react-icons/fa";
import { akonyFont } from "@/lib/fonts";

interface VideoPlayerProps {
  src: string;
  title: string;
  subtitle?: string;
  onClose?: () => void;
  loader?: ReactNode;
  initialTime?: number;
  onTimeUpdate?: (t: number, d: number) => void;
}

type SettingsView = "main" | "quality" | "speed";

interface Quality {
  height: number;
  index: number;
}

const PLAYBACK_SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

const LoadingSpinner = ({ text }: { text?: string }) => (
  <div className="flex flex-col items-center gap-4">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full border-4 border-white/20" />
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#F4FFB4] animate-spin" />
    </div>
    {text && <p className="text-white/70 text-sm animate-pulse">{text}</p>}
  </div>
);

const GhostButton = ({ isPlaying }: { isPlaying: boolean }) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="bg-white/10 backdrop-blur-md rounded-full p-8 animate-ghost">
      {isPlaying ? (
        <IoPlay className="size-16 text-white" />
      ) : (
        <TbPlayerPauseFilled className="size-16 text-white" />
      )}
    </div>
  </div>
);

const VideoHeader = ({
  title,
  subtitle,
  onClose,
  showControls,
}: {
  title: string;
  subtitle?: string;
  onClose?: () => void;
  showControls: boolean;
}) => (
  <div
    className={cn(
      "absolute top-0 left-0 right-0 bg-linear-to-b from-black/90 via-black/50 to-transparent p-6 transition-all duration-300",
      showControls ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
    )}
  >
    <div className="flex items-start justify-between">
      <div className="animate-fade-in">
        <h1
          className={cn(
            akonyFont.className,
            "text-2xl font-bold text-white tracking-wider mb-1"
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-white/70 tracking-wide">{subtitle}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-white hover:text-white/70 transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <MdClose className="w-8 h-8" />
        </button>
      )}
    </div>
  </div>
);

const VolumeControl = ({
  isMuted,
  volume,
  onToggleMute,
  onVolumeChange,
}: {
  isMuted: boolean;
  volume: number;
  onToggleMute: () => void;
  onVolumeChange: (value: number[]) => void;
}) => (
  <div className="group flex items-center gap-3">
    <button
      onClick={onToggleMute}
      className="text-white hover:text-[#F4FFB4] transition-all duration-200 hover:scale-110 active:scale-95"
    >
      {isMuted ? (
        <LuVolumeX className="w-7 h-7" />
      ) : (
        <LuVolume2 className="w-7 h-7" />
      )}
    </button>
    <div className="w-0 opacity-0 group-hover:w-24 group-hover:opacity-100 transition-all duration-300 ease-out overflow-hidden">
      <Slider
        value={[isMuted ? 0 : volume]}
        max={1}
        step={0.01}
        onValueChange={onVolumeChange}
        className="cursor-pointer"
      />
    </div>
  </div>
);

const SettingsMenu = ({
  settingsView,
  currentQuality,
  availableQualities,
  playbackSpeed,
  onViewChange,
  onQualityChange,
  onSpeedChange,
}: {
  settingsView: SettingsView;
  currentQuality: number;
  availableQualities: Quality[];
  playbackSpeed: number;
  onViewChange: (view: SettingsView) => void;
  onQualityChange: (index: number) => void;
  onSpeedChange: (speed: number) => void;
}) => (
  <div className="absolute bottom-full right-0 mb-2 bg-black/95 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden min-w-[260px] shadow-2xl animate-fade-in">
    <div className="relative h-full">
      <div
        className={cn(
          "transition-all duration-300 ease-out",
          settingsView === "main"
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 absolute inset-0 pointer-events-none"
        )}
      >
        <div className="py-2">
          <button
            onClick={() => onViewChange("quality")}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/10 transition-all duration-200 text-left group"
          >
            <div className="flex items-center gap-3">
              <MdHighQuality className="w-5 h-5 text-white group-hover:text-[#F4FFB4] transition-colors" />
              <span className="text-white text-sm group-hover:text-[#F4FFB4] transition-colors">
                Качество
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#F4FFB4] text-xs font-medium">
                {currentQuality === -1
                  ? "Авто"
                  : `${availableQualities[currentQuality]?.height}p`}
              </span>
              <FaChevronRight className="w-3 h-3 text-white/50 group-hover:text-[#F4FFB4] group-hover:translate-x-1 transition-all" />
            </div>
          </button>

          <button
            onClick={() => onViewChange("speed")}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/10 transition-all duration-200 text-left group"
          >
            <div className="flex items-center gap-3">
              <MdOutlineSpeed className="w-5 h-5 text-white group-hover:text-[#F4FFB4] transition-colors" />
              <span className="text-white text-sm group-hover:text-[#F4FFB4] transition-colors">
                Скорость
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#F4FFB4] text-xs font-medium">
                {playbackSpeed}x
              </span>
              <FaChevronRight className="w-3 h-3 text-white/50 group-hover:text-[#F4FFB4] group-hover:translate-x-1 transition-all" />
            </div>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "transition-all duration-300 ease-out",
          settingsView === "quality"
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 absolute inset-0 pointer-events-none"
        )}
      >
        <div className="py-2">
          <div className="px-4 py-3 flex items-center gap-3 border-b border-white/10">
            <button
              onClick={() => onViewChange("main")}
              className="text-white/70 hover:text-[#F4FFB4] transition-all hover:scale-110 active:scale-95"
            >
              <FaChevronLeft className="w-3 h-3" />
            </button>
            <span className="text-white text-sm font-medium">Качество</span>
          </div>

          <button
            onClick={() => onQualityChange(-1)}
            className={cn(
              "w-full px-4 py-3 text-left hover:bg-white/10 transition-all duration-200 group",
              currentQuality === -1 && "bg-white/5"
            )}
          >
            <span
              className={cn(
                "text-sm transition-colors",
                currentQuality === -1
                  ? "text-[#F4FFB4] font-medium"
                  : "text-white group-hover:text-[#F4FFB4]"
              )}
            >
              Авто
            </span>
          </button>

          {availableQualities.map((quality) => (
            <button
              key={quality.index}
              onClick={() => onQualityChange(quality.index)}
              className={cn(
                "w-full px-4 py-3 text-left hover:bg-white/10 transition-all duration-200 group",
                currentQuality === quality.index && "bg-white/5"
              )}
            >
              <span
                className={cn(
                  "text-sm transition-colors",
                  currentQuality === quality.index
                    ? "text-[#F4FFB4] font-medium"
                    : "text-white group-hover:text-[#F4FFB4]"
                )}
              >
                {quality.height}p
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "transition-all duration-300 ease-out",
          settingsView === "speed"
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 absolute inset-0 pointer-events-none"
        )}
      >
        <div className="py-2">
          <div className="px-4 py-3 flex items-center gap-3 border-b border-white/10">
            <button
              onClick={() => onViewChange("main")}
              className="text-white/70 hover:text-[#F4FFB4] transition-all hover:scale-110 active:scale-95"
            >
              <FaChevronLeft className="w-3 h-3" />
            </button>
            <span className="text-white text-sm font-medium">Скорость</span>
          </div>

          {PLAYBACK_SPEEDS.map((speed) => (
            <button
              key={speed}
              onClick={() => onSpeedChange(speed)}
              className={cn(
                "w-full px-4 py-3 text-left hover:bg-white/10 transition-all duration-200 group",
                playbackSpeed === speed && "bg-white/5"
              )}
            >
              <span
                className={cn(
                  "text-sm transition-colors",
                  playbackSpeed === speed
                    ? "text-[#F4FFB4] font-medium"
                    : "text-white group-hover:text-[#F4FFB4]"
                )}
              >
                {speed === 1 ? "Обычная" : `${speed}x`}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const VideoPlayer = ({
  src,
  title,
  subtitle,
  onClose,
  loader,
  initialTime = 0,
  onTimeUpdate,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout>(null);
  const ghostTimeoutRef = useRef<NodeJS.Timeout>(null);

  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPercent, setHoverPercent] = useState<number | null>(null);

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return "0:00";
    const s = Math.floor(seconds);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleTimelineHover = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clampedX = Math.max(0, Math.min(rect.width, x));
    const percent = clampedX / rect.width;
    const time = percent * duration;

    setHoverTime(time);
    setHoverPercent(percent);
  };

  const handleTimelineLeave = () => {
    setHoverTime(null);
    setHoverPercent(null);
  };

  const [hls, setHls] = useState<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsView, setSettingsView] = useState<SettingsView>("main");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [availableQualities, setAvailableQualities] = useState<Quality[]>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(-1);
  const [showGhostButton, setShowGhostButton] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target as Node)
      ) {
        setShowSettings(false);
        setSettingsView("main");
      }
    };

    if (showSettings) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettings]);

  useEffect(() => {
    if (!videoRef.current || !src) return;

    const video = videoRef.current;
    setIsLoading(true);

    if (Hls.isSupported()) {
      const hlsInstance = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hlsInstance.loadSource(src);
      hlsInstance.attachMedia(video);

      hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        const levels = hlsInstance.levels.map((level, index) => ({
          height: level.height,
          index,
        }));
        setAvailableQualities(levels);

        video.play().catch((err) => {
          console.log("Не удалось воспроизвести видео");
        });
      });

      hlsInstance.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error("HLS Fatal Error:", data);
          setIsLoading(false);
        }
      });

      setHls(hlsInstance);

      return () => {
        hlsInstance.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.addEventListener("loadeddata", () => {
        setIsLoading(false);
        video.play().catch((err) => {
          console.log("Не удалось воспроизвести видео");
        });
      });
    }
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (onTimeUpdate && !Number.isNaN(video.duration) && video.duration > 0) {
        onTimeUpdate(video.currentTime, video.duration);
      }
    };

    const handleDurationChange = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setIsBuffering(true);
    const handleCanPlay = () => setIsBuffering(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [onTimeUpdate]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !duration || !initialTime) return;

    if (initialTime > 0 && initialTime < duration) {
      video.currentTime = initialTime;
      setCurrentTime(initialTime);
    }
  }, [duration, initialTime]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const resetControlsTimeout = () => {
    setShowControls(true);
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    if (isPlaying) {
      hideControlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
        setShowSettings(false);
      }, 3000);
    }
  };

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }

      setShowGhostButton(true);
      if (ghostTimeoutRef.current) {
        clearTimeout(ghostTimeoutRef.current);
      }
      ghostTimeoutRef.current = setTimeout(() => {
        setShowGhostButton(false);
      }, 600);
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume || 0.5;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleQualityChange = (qualityIndex: number) => {
    if (hls) {
      hls.currentLevel = qualityIndex;
      setCurrentQuality(qualityIndex);
      setSettingsView("main");
      setTimeout(() => setShowSettings(false), 300);
    }
  };

  const handleSpeedChange = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
      setSettingsView("main");
      setTimeout(() => setShowSettings(false), 300);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black overflow-hidden"
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video ref={videoRef} className="w-full h-full object-contain" />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          {loader || <LoadingSpinner text="Загрузка..." />}
        </div>
      )}

      {isBuffering && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {loader || <LoadingSpinner />}
        </div>
      )}

      {showGhostButton && <GhostButton isPlaying={isPlaying} />}

      <VideoHeader
        title={title}
        subtitle={subtitle}
        onClose={onClose}
        showControls={showControls}
      />

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/95 via-black/80 to-transparent transition-all duration-300",
          showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <div className="px-6 pt-4">
          <div
            className="relative"
            onMouseMove={handleTimelineHover}
            onMouseLeave={handleTimelineLeave}
          >
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleProgressChange}
              className="cursor-pointer"
            />

            {hoverTime !== null && hoverPercent !== null && duration > 0 && (
              <div
                className="pointer-events-none absolute -top-9 flex flex-col items-center"
                style={{
                  left: `${hoverPercent * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="rounded-md bg-black/90 px-2 py-1 text-xs text-white shadow-lg">
                  {formatTime(hoverTime)}
                </div>
                <div className="mt-1 h-3 w-px bg-[#F4FFB4]" />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between px-6 pb-6 pt-3">
          <div className="flex items-center gap-5">
            <button
              onClick={togglePlay}
              className="text-white hover:text-[#F4FFB4] transition-all duration-200 hover:scale-110 active:scale-95"
            >
              {isPlaying ? (
                <TbPlayerPauseFilled className="w-7 h-7" />
              ) : (
                <IoPlay className="w-7 h-7" />
              )}
            </button>

            <button
              onClick={() => skip(-10)}
              className="text-white hover:text-[#F4FFB4] transition-all duration-200 relative hover:scale-110 active:scale-95"
            >
              <TbRewindBackward10 className="w-8 h-8" />
            </button>

            <button
              onClick={() => skip(10)}
              className="text-white hover:text-[#F4FFB4] transition-all duration-200 relative hover:scale-110 active:scale-95"
            >
              <TbRewindForward10 className="w-8 h-8" />
            </button>

            <VolumeControl
              isMuted={isMuted}
              volume={volume}
              onToggleMute={toggleMute}
              onVolumeChange={handleVolumeChange}
            />
          </div>

          <div className="flex items-center gap-5">
            <div ref={settingsRef} className="relative">
              <button
                onClick={() => {
                  setShowSettings(!showSettings);
                  if (!showSettings) {
                    setSettingsView("main");
                  }
                }}
                className={cn(
                  "text-white transition-all duration-200 hover:scale-110 active:scale-95",
                  showSettings
                    ? "text-[#F4FFB4] scale-110"
                    : "hover:text-[#F4FFB4]"
                )}
              >
                <MdSettings
                  className={cn(
                    "w-7 h-7 transition-transform duration-300",
                    showSettings && "rotate-90"
                  )}
                />
              </button>

              {showSettings && (
                <SettingsMenu
                  settingsView={settingsView}
                  currentQuality={currentQuality}
                  availableQualities={availableQualities}
                  playbackSpeed={playbackSpeed}
                  onViewChange={setSettingsView}
                  onQualityChange={handleQualityChange}
                  onSpeedChange={handleSpeedChange}
                />
              )}
            </div>

            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-[#F4FFB4] transition-all duration-200 hover:scale-110 active:scale-95"
            >
              {isFullscreen ? (
                <FaCompress className="w-6 h-6" />
              ) : (
                <FaExpand className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
