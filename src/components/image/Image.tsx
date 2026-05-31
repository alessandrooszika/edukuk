import { type ComponentPropsWithoutRef } from "react";
import styles from "./Image.module.css";

interface ImageProps extends Omit<ComponentPropsWithoutRef<"img">, "children"> {
  caption?: string;
}

export const Image = ({ caption, className = "", ...rest }: ImageProps) => (
  <figure className={styles.figure}>
    <img className={className} {...rest} />
    {caption && <figcaption className={styles.figcaption}>{caption}</figcaption>}
  </figure>
);
