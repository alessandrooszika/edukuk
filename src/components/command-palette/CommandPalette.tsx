import { useState, useEffect, useRef, useMemo, useCallback, startTransition, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Box } from "../box/Box";
import { SearchIcon } from "../icons";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import styles from "./CommandPalette.module.css";

export interface Command {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  shortcut?: string;
  category?: string;
}

interface CommandGroup {
  heading: string;
  items: Command[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  groups: CommandGroup[];
  onExecute?: (id: string) => void;
}

function flattenCommands(groups: CommandGroup[]): Command[] {
  return groups.flatMap((g) => g.items);
}

export const CommandPalette = ({
  isOpen,
  onClose,
  groups,
  onExecute,
}: CommandPaletteProps) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(isOpen);

  const filtered = useMemo(() => {
    if (!query.trim()) return groups;
    const q = query.toLowerCase();
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (cmd) =>
            cmd.label.toLowerCase().includes(q) ||
            cmd.description?.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [groups, query]);

  const filteredFlat = useMemo(() => flattenCommands(filtered), [filtered]);

  const execute = useCallback((id: string) => {
    onExecute?.(id);
    setQuery("");
    setHighlightIndex(0);
    onClose();
  }, [onExecute, onClose]);

  useEffect(() => {
    if (!isOpen) {
      startTransition(() => { setQuery(""); setHighlightIndex(0); });
      return;
    }
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((prev) => Math.min(prev + 1, filteredFlat.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((prev) => Math.max(prev - 1, 0));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (filteredFlat[highlightIndex]) {
          execute(filteredFlat[highlightIndex].id);
        }
        return;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, filteredFlat, highlightIndex, execute]);

  if (!isOpen) return null;

  let cmdIndex = 0;

  return (
    <Box
      ref={overlayRef}
      className={styles.overlay}
      onClick={onClose}
    >
      <Box className={styles.palette} onClick={(e) => e.stopPropagation()}>
        <div className={styles.inputWrapper}>
          <SearchIcon className={styles.searchIcon} size={18} />
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder={t("commandPalette.placeholder")}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlightIndex(0);
            }}
            role="combobox"
            aria-expanded
            aria-haspopup="listbox"
          />
        </div>
        <div className={styles.results} role="listbox">
          {filtered.map((group) => (
            <div key={group.heading}>
              <div className={styles.groupHeading}>{group.heading}</div>
              {group.items.map((cmd) => {
                const idx = cmdIndex++;
                const isHighlighted = idx === highlightIndex;
                return (
                  <div
                    key={cmd.id}
                    className={`${styles.command} ${isHighlighted ? styles.commandHighlighted : ""}`}
                    role="option"
                    aria-selected={isHighlighted}
                    onClick={() => execute(cmd.id)}
                    onPointerEnter={() => setHighlightIndex(idx)}
                  >
                    {cmd.icon && <span className={styles.commandIcon}>{cmd.icon}</span>}
                    <div className={styles.commandInfo}>
                      <span className={styles.commandLabel}>{cmd.label}</span>
                      {cmd.description && (
                        <span className={styles.commandDesc}>{cmd.description}</span>
                      )}
                    </div>
                    {cmd.shortcut && (
                      <kbd className={styles.shortcut}>{cmd.shortcut}</kbd>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
          {filteredFlat.length === 0 && (
            <div className={styles.empty}>{t("commandPalette.noResults")}</div>
          )}
        </div>
      </Box>
    </Box>
  );
};
