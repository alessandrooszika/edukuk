import { useState, useRef, useId, useMemo, type ReactNode } from "react";
import { CloseIcon, UploadIcon, FileIcon } from "../icons";
import type { Variant } from "../../types";
import { Button } from "../button/Button";
import styles from "./FileInput.module.css";
import { Box } from "../box";

interface FileInfo {
  name: string;
  size: number;
}

interface FileInputProps {
  accept?: string;
  multiple?: boolean;
  label?: string;
  error?: string;
  variant?: Variant;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  onChange?: (files: File[]) => void;
  value?: FileInfo[];
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const FileInput = ({
  accept,
  multiple = false,
  label,
  error,
  variant = "default",
  disabled = false,
  className = "",
  children,
  onChange,
  value: externalFiles,
}: FileInputProps) => {
  const [internalFiles, setInternalFiles] = useState<FileInfo[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const id = `${generatedId}-file`;
  const files = externalFiles ?? internalFiles;
  const hasFiles = files.length > 0;
  const isTouch = useMemo(() => "ontouchstart" in window, []);

  const handleFiles = (fileList: FileList) => {
    const incoming = Array.from(fileList).map((f) => ({ name: f.name, size: f.size }));
    const updated = multiple ? [...files, ...incoming] : incoming;
    setInternalFiles(updated);
    onChange?.(Array.from(fileList));
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setInternalFiles(updated);
    if (inputRef.current) inputRef.current.value = "";
  };

  const openPicker = () => inputRef.current?.click();

  return (
    <Box className={`${styles.wrapper} ${className}`}>
      {label && <span className={styles.label}>{label}</span>}

      <Box
        className={`${styles.dropZone} ${dragOver ? styles.dragOver : ""} ${disabled ? styles.disabled : ""} ${error ? styles.hasError : ""} ${styles[variant]}`}
        onClick={disabled ? undefined : openPicker}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); if (!disabled && e.dataTransfer.files.length) handleFiles(e.dataTransfer.files); }}
        onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && !disabled) { e.preventDefault(); openPicker(); } }}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={label ? `Seleccionar archivo${multiple ? "s" : ""}: ${label}` : "Seleccionar archivo"}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          className={styles.hidden}
          onChange={(e) => { if (e.target.files?.length) handleFiles(e.target.files); }}
          disabled={disabled}
          aria-hidden="true"
          tabIndex={-1}
        />
        <UploadIcon className={styles.uploadIcon} />
        {children ?? (
          <span className={styles.hint}>
            {isTouch ? (
              <strong>Presioná para seleccionar</strong>
            ) : (
              <><strong>Hacé clic</strong> o arrastrá un archivo{multiple ? "s" : ""} aquí</>
            )}
          </span>
        )}
      </Box>

      {error && <span className={styles.error} role="alert">{error}</span>}

      {hasFiles && (
        <Box className={styles.fileList}>
          {files.map((file, i) => (
            <Box key={`${file.name}-${i}`} className={styles.fileItem}>
              <FileIcon className={styles.fileIcon} />
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.fileSize}>{formatSize(file.size)}</span>
              <Button iconOnly className={styles.fileRemove}
                onClick={() => removeFile(i)}
                aria-label={`Eliminar ${file.name}`}
              >
                <CloseIcon />
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};