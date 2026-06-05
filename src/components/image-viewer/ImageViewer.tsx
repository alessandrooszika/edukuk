import { useRef, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Box } from "../box";
import { Typography } from "../typography";
import { Button } from "../button";
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from "../icons";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useMediaQuery, mediaQueries } from "../../styles/breakpoints";
import styles from "./ImageViewer.module.css";

export interface ImageViewerImage {
  src: string;
  alt?: string;
}

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  src?: string;
  alt?: string;
  images?: ImageViewerImage[];
  initialIndex?: number;
}

export const ImageViewer = ({
  isOpen,
  onClose,
  src,
  alt,
  images,
  initialIndex = 0,
}: ImageViewerProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef(0);
  const [index, setIndex] = useState(initialIndex);
  const isDesktop = useMediaQuery(mediaQueries.lg);

  const allImages: ImageViewerImage[] = images?.length
    ? images
    : src
      ? [{ src, alt }]
      : [];

  const current = allImages[index] || allImages[0];

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % allImages.length);
  }, [allImages.length]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); goNext(); nextBtnRef.current?.focus(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); prevBtnRef.current?.focus(); }
    },
    [goNext, goPrev]
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  useBodyScrollLock(isOpen);
  useFocusTrap(panelRef, isOpen, onClose);

  if (!isOpen) return null;

  const hasMultiple = allImages.length > 1;

  return createPortal(
    <Box className={styles.overlay} onClick={onClose}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0) goPrev();
          else goNext();
        }
      }}
    >
      <Box
        ref={panelRef}
        className={styles.panel}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={current?.alt || "Image viewer"}
        tabIndex={-1}
      >
        <Button variant="ghost" onClick={onClose} aria-label="Cerrar visor"
          style={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
          <CloseIcon size={20} />
        </Button>
        {hasMultiple && isDesktop && (
          <Button ref={prevBtnRef} variant="ghost" onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Anterior"
            style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", zIndex: 2 }}>
            <ChevronLeftIcon size={20} />
          </Button>
        )}
        {current && (
          <img
            src={current.src}
            alt={current.alt || ""}
            className={styles.img}
          />
        )}
        {hasMultiple && isDesktop && (
          <Button ref={nextBtnRef} variant="ghost" onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Siguiente"
            style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", zIndex: 2 }}>
            <ChevronRightIcon size={20} />
          </Button>
        )}
        {hasMultiple && (
          <Typography variant="caption" className={styles.counter}>
            {index + 1} / {allImages.length}
          </Typography>
        )}
      </Box>
    </Box>,
    document.body
  );
};
