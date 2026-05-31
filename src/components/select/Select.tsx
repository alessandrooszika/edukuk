import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import type { Variant, Size } from "../../types";
import { ChevronDownIcon, CheckIcon } from "../icons";
import { Box } from "../box/Box";
import styles from "./Select.module.css";

interface SelectOption {
  value: string;
  label?: string;
}

type SelectOptions = (string | SelectOption)[];

interface SelectProps {
  options: SelectOptions;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: Variant;
  size?: Size;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

function normalizeOptions(options: SelectOptions): SelectOption[] {
  return options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );
}

export const Select = ({
  options,
  value,
  onChange,
  placeholder = "Seleccionar...",
  variant = "default",
  size = "md",
  label,
  error,
  disabled = false,
  className = "",
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const normalized = normalizeOptions(options);
  const selected = normalized.find((opt) => opt.value === value);
  const variantVar = variant === "default" ? "var(--accent)" : `var(--${variant})`;

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: PointerEvent) => {
      if (
        wrapperRef.current?.contains(e.target as Node) ||
        listRef.current?.contains(e.target as Node)
      ) return;
      setOpen(false);
      setHighlightIndex(-1);
    };
    document.addEventListener("pointerdown", handleClick);
    return () => document.removeEventListener("pointerdown", handleClick);
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !listRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    listRef.current.style.position = "fixed";
    listRef.current.style.top = `${rect.bottom + 4}px`;
    listRef.current.style.left = `${rect.left}px`;
    listRef.current.style.minWidth = `${rect.width}px`;
    if (highlightIndex >= 0) {
      const item = listRef.current.children[highlightIndex] as HTMLElement | undefined;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [open, highlightIndex]);

  useEffect(() => {
    if (!open) return;
    const updatePosition = () => {
      if (!listRef.current || !triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      listRef.current.style.position = "fixed";
      listRef.current.style.top = `${rect.bottom + 4}px`;
      listRef.current.style.left = `${rect.left}px`;
      listRef.current.style.minWidth = `${rect.width}px`;
    };
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  const getInitialHighlight = () => {
    const idx = normalized.findIndex((opt) => opt.value === value);
    setHighlightIndex(idx >= 0 ? idx : 0);
  };

  const selectOption = (optValue: string) => {
    onChange(optValue);
    setOpen(false);
    setHighlightIndex(-1);
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      getInitialHighlight();
    }
    if (e.key === "Escape") {
      setOpen(false);
      setHighlightIndex(-1);
      triggerRef.current?.focus();
    }
  };

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
    switch (e.key) {
      case "Enter":
      case " ":
        if (highlightIndex >= 0) {
          selectOption(normalized[highlightIndex].value);
        }
        break;
      case "ArrowDown":
        setHighlightIndex((prev) =>
          prev < normalized.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        setHighlightIndex((prev) =>
          prev > 0 ? prev - 1 : normalized.length - 1
        );
        break;
      case "Escape":
        setOpen(false);
        setHighlightIndex(-1);
        triggerRef.current?.focus();
        break;
    }
  };

  return (
    <Box
      ref={wrapperRef}
      className={`${styles.wrapper} ${className}`}
    >
      {label && <span className={styles.label}>{label}</span>}
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${styles[size]} ${styles[variant]} ${error ? styles.hasError : ""} ${disabled ? styles.disabled : ""}`}
        onClick={() => {
          if (disabled) return;
          if (!open) getInitialHighlight();
          setOpen((prev) => !prev);
        }}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
      >
        <span className={`${styles.value} ${selected ? styles.selected : ""}`}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDownIcon
          size={12}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>
      {open && createPortal(
        <ul
          ref={listRef}
          className={`${styles.dropdown}`}
          style={{ "--input-color": variantVar } as React.CSSProperties}
          onKeyDown={handleListKeyDown}
          role="listbox"
          aria-label={label}
        >
          {normalized.map((opt, i) => {
            const isSelected = opt.value === value;
            const isHighlighted = i === highlightIndex;
            return (
              <li
                key={opt.value}
                className={`${styles.option} ${isSelected ? styles.optionSelected : ""} ${isHighlighted ? styles.optionHighlighted : ""}`}
                onClick={() => selectOption(opt.value)}
                onPointerEnter={() => setHighlightIndex(i)}
                role="option"
                aria-selected={isSelected}
              >
                {isSelected && (
                  <CheckIcon className={styles.checkmark} />
                )}
                <span className={isSelected ? styles.optionTextSelected : styles.optionText}>
                  {opt.label}
                </span>
              </li>
            );
          })}
        </ul>,
        document.body
      )}
      {error && <span className={styles.error} role="alert">{error}</span>}
    </Box>
  );
};