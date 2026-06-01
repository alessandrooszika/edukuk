import { useEffect, useState } from "react";
import { Image } from "../image/Image";
import styles from "./LogoWatermark.module.css";

interface LogoWatermarkProps {
  size?: number;
  className?: string;
}

function getTheme(): string {
  return document.documentElement.getAttribute("data-theme") || "light";
}

export const LogoWatermark = ({ size = 24, className = "" }: LogoWatermarkProps) => {
  const [dark, setDark] = useState(() => getTheme() === "dark");

  useEffect(() => {
    const handler = () => setDark(getTheme() === "dark");
    window.addEventListener("themechange", handler);
    return () => window.removeEventListener("themechange", handler);
  }, []);

  return (
    <span className={`${styles.wrapper} ${className}`}>
      <Image
        className={styles.img}
        src={dark ? "favicon-dark.webp" : "favicon-light.webp"}
        width={size}
        height={size}
        alt=""
      />
      <span className={styles.text}>edukuk</span>
    </span>
  );
};
