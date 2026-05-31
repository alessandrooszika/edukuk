import { useState, useRef, useEffect, useMemo, useId } from "react";
import { createPortal } from "react-dom";
import { Input } from "../input/Input";
import type { Variant, Size } from "../../types";
import styles from "./Autocomplete.module.css";
import { Box } from "../box/Box";

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
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const optionBaseId = useId();

  const variantVar = variant === "default" ? "var(--accent)" : `var(--${variant})`;

  const filteredOptions = useMemo(
    () => options.filter((opt) => opt.toLowerCase().includes(value.toLowerCase())),
    [options, value]
  );

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        wrapperRef.current?.contains(e.target as Node) ||
        listRef.current?.contains(e.target as Node)
      ) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    if (!open || !inputRef.current) return;
    const updatePosition = () => {
      if (!inputRef.current) return;
      const rect = inputRef.current.getBoundingClientRect();
      if (!listRef.current) return;
      listRef.current.style.top = `${rect.bottom + 4}px`;
      listRef.current.style.left = `${rect.left}px`;
      listRef.current.style.minWidth = `${rect.width}px`;
    };
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, filteredOptions.length]);

  const resetHighlight = (nextOpen: boolean, list: string[]) => {
    setHighlightIndex(nextOpen && list.length > 0 ? 0 : -1);
  };

  useEffect(() => {
    if (open && listRef.current && highlightIndex >= 0) {
      const item = listRef.current.children[highlightIndex] as HTMLElement | undefined;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIndex, open]);

  const selectOption = (opt: string) => {
    onChange(opt);
    setOpen(false);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (!open) {
      setOpen(true);
      resetHighlight(true, options.filter((opt) =>
        opt.toLowerCase().includes(e.target.value.toLowerCase())
      ));
    } else {
      resetHighlight(true, options.filter((opt) =>
        opt.toLowerCase().includes(e.target.value.toLowerCase())
      ));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) { setOpen(true); resetHighlight(true, filteredOptions); break; }
        if (filteredOptions.length > 0) {
          setHighlightIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) { setOpen(true); resetHighlight(true, filteredOptions); break; }
        if (filteredOptions.length > 0) {
          setHighlightIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        break;
      case "Enter":
        if (open && highlightIndex >= 0 && highlightIndex < filteredOptions.length) {
          e.preventDefault();
          selectOption(filteredOptions[highlightIndex]);
        }
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
          setHighlightIndex(-1);
        }
        break;
    }
  };

  const handleFocus = () => {
    if (value && filteredOptions.length > 0) {
      setOpen(true);
      resetHighlight(true, filteredOptions);
    }
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
        onKeyDown={handleKeyDown}
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
          style={{ "--input-color": variantVar } as React.CSSProperties}
          role="listbox"
          aria-label={label ?? placeholder}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, i) => (
              <li
                key={opt}
                id={`${optionBaseId}-${i}`}
                className={`${styles.option} ${opt === value ? styles.optionSelected : ""} ${i === highlightIndex ? styles.optionHighlighted : ""}`}
                onClick={() => selectOption(opt)}
                onMouseEnter={() => setHighlightIndex(i)}
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
