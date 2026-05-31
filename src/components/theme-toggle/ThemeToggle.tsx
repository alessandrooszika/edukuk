import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "../icons";
import styles from "./ThemeToggle.module.css";

const THEME_EVENT = "themechange";

function getStoredTheme(): string | null {
  return localStorage.getItem("theme");
}

function getEffectiveTheme(): string {
  return getStoredTheme() || "light";
}

function applyTheme(theme: string) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme }));
}

export const ThemeToggle = () => {
  const [dark, setDark] = useState(() => getEffectiveTheme() === "dark");

  useEffect(() => {
    const onCustom = (e: Event) => {
      setDark((e as CustomEvent).detail === "dark");
    };
    window.addEventListener(THEME_EVENT, onCustom);
    return () => window.removeEventListener(THEME_EVENT, onCustom);
  }, []);

  const toggle = () => {
    applyTheme(dark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      className={`${styles.toggle} ${dark ? styles.dark : styles.light}`}
      onClick={toggle}
      role="switch"
      aria-checked={dark}
      aria-label={`Cambiar a modo ${dark ? "claro" : "oscuro"}`}
    >
      <span className={`${styles.icon} ${styles.sun}`} aria-hidden="true">
        <SunIcon />
      </span>
      <span className={`${styles.icon} ${styles.moon}`} aria-hidden="true">
        <MoonIcon />
      </span>
      <span className={styles.thumb} />
    </button>
  );
};
