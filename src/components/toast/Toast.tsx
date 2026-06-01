/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import type { Variant } from "../../types";
import { InfoIcon, SuccessIcon, WarningIcon, ErrorIcon } from "../icons";
import styles from "./Toast.module.css";

export type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

interface ToastItem {
  id: string;
  message: string;
  variant: Variant;
  position: ToastPosition;
  duration: number;
  exiting: boolean;
}

interface ToastContextValue {
  addToast: (opts: {
    message: string;
    variant?: Variant;
    duration?: number;
    position?: ToastPosition;
  }) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast debe usarse dentro de un ToastProvider");
  }
  return ctx;
};

interface ToastProviderProps {
  children: ReactNode;
  defaultPosition?: ToastPosition;
  defaultDuration?: number;
}

export const ToastProvider = ({
  children,
  defaultPosition = "top-right",
  defaultDuration = 5000,
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counterRef = useRef(0);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 250);
  }, []);

  const addToast = useCallback(
    (opts: {
      message: string;
      variant?: Variant;
      duration?: number;
      position?: ToastPosition;
    }) => {
      const id = `toast-${++counterRef.current}`;
      const item: ToastItem = {
        id,
        message: opts.message,
        variant: opts.variant || "default",
        position: opts.position || defaultPosition,
        duration: opts.duration ?? defaultDuration,
        exiting: false,
      };
      setToasts((prev) => [...prev, item]);
      if (item.duration > 0) {
        setTimeout(() => removeToast(id), item.duration);
      }
      return id;
    },
    [defaultPosition, defaultDuration, removeToast]
  );

  useEffect(() => {
    if (toasts.length === 0) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && toasts.length > 0) {
        removeToast(toasts[toasts.length - 1].id);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [toasts, removeToast]);

  const grouped = toasts.reduce<Record<string, ToastItem[]>>((acc, t) => {
    if (!acc[t.position]) acc[t.position] = [];
    acc[t.position].push(t);
    return acc;
  }, {} as Record<string, ToastItem[]>);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {Object.entries(grouped).map(([position, items]) => (
        <div
          key={position}
          className={`${styles.provider} ${styles[position as ToastPosition]}`}
          aria-live="polite"
          aria-label="Notificaciones"
        >
          {items.map((t) => (
            <div
              key={t.id}
              className={`${styles.toast} ${styles[t.variant]} ${t.exiting ? styles.exiting : ""}`}
              role="alert"
            >
              <span className={styles.icon}>
                {(t.variant === "default" || t.variant === "info") && <InfoIcon size={16} />}
                {t.variant === "success" && <SuccessIcon size={16} />}
                {t.variant === "warning" && <WarningIcon size={16} />}
                {t.variant === "danger" && <ErrorIcon size={16} />}
              </span>
              <span className={styles.message}>{t.message}</span>
              <button
                className={styles.closeBtn}
                onClick={() => removeToast(t.id)}
                aria-label="Cerrar notificación"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ))}
    </ToastContext.Provider>
  );
};
