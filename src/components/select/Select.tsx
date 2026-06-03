import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import type { Variant, Size } from "../../types";
import { ChevronDownIcon, CheckIcon } from "../icons";
import { Box } from "../box";
import { useFloatingUI } from "../../hooks/useFloatingUI";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useHighlightNavigation } from "../../hooks/useHighlightNavigation";
import { getAccentColor } from "../../utils/variantColor";
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const normalized = normalizeOptions(options);
  const selected = normalized.find((opt) => opt.value === value);
  const accentColor = getAccentColor(variant);

  const {
    highlightIndex,
    setHighlightIndex,
    handleKeyDown,
    onPointerEnter,
  } = useHighlightNavigation({
    itemCount: normalized.length,
    isOpen: open,
    listRef,
    onEnter: () => {
      if (highlightIndex >= 0 && highlightIndex < normalized.length) {
        const optValue = normalized[highlightIndex].value;
        onChange(optValue);
        setOpen(false);
        setHighlightIndex(-1);
        triggerRef.current?.focus();
      }
    },
    onEscape: () => {
      setOpen(false);
      setHighlightIndex(-1);
      triggerRef.current?.focus();
    },
    wrapAround: true,
    initialIndex: -1,
  });

  useFloatingUI(triggerRef, listRef, open);
  useClickOutside([wrapperRef, listRef], useCallback(() => {
    setOpen(false);
    setHighlightIndex(-1);
  }, [setHighlightIndex]), open);

  const openAndHighlight = () => {
    const idx = normalized.findIndex((opt) => opt.value === value);
    setHighlightIndex(idx >= 0 ? idx : 0);
    setOpen(true);
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      openAndHighlight();
    }
    if (e.key === "Escape") {
      setOpen(false);
      setHighlightIndex(-1);
      triggerRef.current?.focus();
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
          if (!open) openAndHighlight();
          else setOpen(false);
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
          style={{ "--input-color": accentColor } as React.CSSProperties}
          onKeyDown={handleKeyDown}
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
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                  setHighlightIndex(-1);
                  triggerRef.current?.focus();
                }}
                onPointerEnter={() => onPointerEnter(i)}
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
