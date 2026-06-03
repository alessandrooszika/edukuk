import { useState, useRef, useMemo, useCallback, useId } from "react";
import { createPortal } from "react-dom";
import { Input } from "../input";
import type { Variant, Size } from "../../types";
import { Box } from "../box";
import { useFloatingUI } from "../../hooks/useFloatingUI";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useHighlightNavigation } from "../../hooks/useHighlightNavigation";
import { getAccentColor } from "../../utils/variantColor";
import styles from "./Autocomplete.module.css";

interface AutocompleteProps {
  options: string[];
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

export const Autocomplete = ({
  options,
  value,
  onChange,
  placeholder = "Escribe...",
  variant = "default",
  size = "md",
  label,
  error,
  disabled,
  className = "",
}: AutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const optionBaseId = useId();

  const accentColor = getAccentColor(variant);

  const filteredOptions = useMemo(
    () => options.filter((opt) => opt.toLowerCase().includes(value.toLowerCase())),
    [options, value]
  );

  const {
    highlightIndex,
    setHighlightIndex,
    handleKeyDown,
    onPointerEnter,
  } = useHighlightNavigation({
    itemCount: filteredOptions.length,
    isOpen: open,
    listRef,
    onEnter: () => {
      if (highlightIndex >= 0 && highlightIndex < filteredOptions.length) {
        onChange(filteredOptions[highlightIndex]);
        setOpen(false);
        setHighlightIndex(-1);
        inputRef.current?.focus();
      }
    },
    onEscape: () => {
      setOpen(false);
      setHighlightIndex(-1);
    },
    wrapAround: true,
    initialIndex: 0,
  });

  useFloatingUI(inputRef, listRef, open);
  useClickOutside([wrapperRef, listRef], useCallback(() => {
    setOpen(false);
  }, []), open);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (!open) setOpen(true);
    setHighlightIndex(0);
  };

  const handleFocus = () => {
    if (value && filteredOptions.length > 0) {
      setOpen(true);
      setHighlightIndex(0);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !open) {
      e.preventDefault();
      setOpen(true);
      setHighlightIndex(0);
      return;
    }
    handleKeyDown(e);
  };

  const activeDescendantId =
    open && highlightIndex >= 0 && highlightIndex < filteredOptions.length
      ? `${optionBaseId}-${highlightIndex}`
      : undefined;

  return (
    <Box ref={wrapperRef} className={`${styles.wrapper} ${className}`}>
      <Input
        ref={inputRef}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onFocus={handleFocus}
        placeholder={placeholder}
        variant={variant}
        size={size}
        label={label}
        error={error}
        disabled={disabled}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={activeDescendantId}
        aria-autocomplete="list"
      />
      {open && createPortal(
        <ul
          ref={listRef}
          id={listId}
          className={styles.dropdown}
          style={{ "--input-color": accentColor } as React.CSSProperties}
          role="listbox"
          aria-label={label ?? placeholder}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, i) => (
              <li
                key={opt}
                id={`${optionBaseId}-${i}`}
                className={`${styles.option} ${opt === value ? styles.optionSelected : ""} ${i === highlightIndex ? styles.optionHighlighted : ""}`}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                  setHighlightIndex(-1);
                  inputRef.current?.focus();
                }}
                onPointerEnter={() => onPointerEnter(i)}
                role="option"
                aria-selected={opt === value}
              >
                {opt}
              </li>
            ))
          ) : (
            <li className={styles.noResults} role="option" aria-disabled>
              Sin resultados
            </li>
          )}
        </ul>,
        document.body
      )}
    </Box>
  );
};
