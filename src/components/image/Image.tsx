import { type ComponentPropsWithoutRef, type KeyboardEvent } from "react";
import { Typography } from "../typography";
import { useImageViewerSafe } from "../image-viewer";
import styles from "./Image.module.css";

interface ImageProps extends Omit<ComponentPropsWithoutRef<"img">, "children"> {
  caption?: string;
  viewer?: boolean;
}

export const Image = ({ caption, viewer, className = "", style, ...rest }: ImageProps) => {
  const viewerCtx = useImageViewerSafe();

  const handleClick = () => {
    if (viewer && viewerCtx && rest.src) {
      viewerCtx.openViewer({ src: rest.src, alt: rest.alt });
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <figure
      className={styles.figure}
      onClick={handleClick}
      role={viewer ? "button" : undefined}
      tabIndex={viewer ? 0 : undefined}
      onKeyDown={viewer ? handleKeyDown : undefined}
      style={viewer ? { cursor: "pointer" } : undefined}
    >
      <img className={className} style={style} {...rest} />
      {caption && <Typography variant="caption" component="figcaption">{caption}</Typography>}
    </figure>
  );
};
