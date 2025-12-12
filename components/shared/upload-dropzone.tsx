import React, { useCallback, useEffect, useRef, useState } from "react";
import { X, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface UploadDropzoneProps {
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  className?: string;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  value,
  onChange,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (value && typeof value !== "string") {
      const file = value as File;
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof value === "string") {
      setPreviewUrl(value);
    } else {
      setPreviewUrl(null);
    }
  }, [value]);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || !files[0]) return;
      const file = files[0];
      if (!onChange) return;

      setIsUploading(true);
      setProgress(0);

      const reader = new FileReader();
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const p = (e.loaded / e.total) * 100;
          setProgress(p);
        }
      };
      reader.onloadend = () => {
        setProgress(100);
        setIsUploading(false);
        onChange(file);
      };
      reader.readAsArrayBuffer(file);
    },
    [onChange]
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  if (value) {
    const isFile = typeof value !== "string";
    const file = isFile ? (value as File) : null;

    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border px-4 py-3",
          className
        )}
      >
        {previewUrl && (
          <div className="h-16 w-12 overflow-hidden rounded-md bg-muted flex items-center justify-center">
            <img
              src={previewUrl}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-sm font-medium truncate max-w-[220px]">
            {isFile ? file?.name : value}
          </span>
          {isFile && (
            <span className="text-xs text-muted-foreground">
              {file ? (file.size / 1024).toFixed(1) : 0} KB
            </span>
          )}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onChange && onChange(null)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-muted/40 px-4 py-6 text-center transition",
          isDragging && "border-primary bg-primary/5",
          isUploading && "opacity-70 pointer-events-none",
          className
        )}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={onClick}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <UploadCloud className="mb-2 h-6 w-6" />
        <p className="text-sm font-medium">
          Перетащите файл сюда или нажмите для выбора
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Поддерживается загрузка одного файла
        </p>
      </div>
      {isUploading && (
        <div className="space-y-1">
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground">
            Загрузка: {Math.round(progress)}%
          </p>
        </div>
      )}
    </div>
  );
};
