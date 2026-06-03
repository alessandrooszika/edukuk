import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import type { TreeNode } from "../../utils/tree";
import { flattenTree } from "../../utils/tree";
import { ChevronDownIcon, ChevronRightIcon } from "../icons";
import { Box } from "../box";
import { Typography } from "../typography";
import { useFloatingUI } from "../../hooks/useFloatingUI";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import styles from "./TreeSelect.module.css";

interface TreeSelectProps {
  options: TreeNode[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

function getLabel(nodes: TreeNode[], value: string): string {
  for (const n of nodes) {
    if (n.id === value) return n.label;
    if (n.children) {
      const found = getLabel(n.children, value);
      if (found) return found;
    }
  }
  return "";
}

export const TreeSelect = ({
  options,
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  className = "",
}: TreeSelectProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const visibleNodes = useMemo(() => flattenTree(options, expandedIds), [options, expandedIds]);
  const selectedLabel = useMemo(() => getLabel(options, value), [options, value]);

  useFloatingUI(triggerRef, listRef, open);
  useClickOutside([wrapperRef, listRef], useCallback(() => {
    setOpen(false);
    setHighlightIndex(0);
  }, []), open);
  useFocusTrap(listRef, open, useCallback(() => {
    setOpen(false);
    setHighlightIndex(0);
    triggerRef.current?.focus();
  }, []));

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectNode = useCallback((id: string) => {
    onChange(id);
    setOpen(false);
    setHighlightIndex(0);
    triggerRef.current?.focus();
  }, [onChange]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const item = listRef.current.children[highlightIndex] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [highlightIndex, open]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setHighlightIndex(0);
    }
    if (e.key === "Escape") {
      setOpen(false);
      setHighlightIndex(0);
      triggerRef.current?.focus();
    }
  };

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
    const current = visibleNodes[highlightIndex];
    switch (e.key) {
      case "Enter":
      case " ":
        if (current) {
          if (current.node.children) {
            toggleExpand(current.node.id);
          } else {
            selectNode(current.node.id);
          }
        }
        break;
      case "ArrowDown":
        setHighlightIndex((prev) => Math.min(prev + 1, visibleNodes.length - 1));
        break;
      case "ArrowUp":
        setHighlightIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "ArrowRight":
        if (current?.node.children && !expandedIds.has(current.node.id)) {
          toggleExpand(current.node.id);
        }
        break;
      case "ArrowLeft":
        if (current?.node.children && expandedIds.has(current.node.id)) {
          toggleExpand(current.node.id);
        }
        break;
      case "Escape":
        setOpen(false);
        setHighlightIndex(0);
        triggerRef.current?.focus();
        break;
    }
  };

  const placeholderText = placeholder ?? t("treeSelect.placeholder");

  return (
    <Box ref={wrapperRef} className={`${styles.wrapper} ${className}`}>
      {label && <Typography variant="caption" className={styles.label}>{label}</Typography>}
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${error ? styles.hasError : ""} ${disabled ? styles.disabled : ""}`}
        onClick={() => {
          if (disabled) return;
          setOpen((prev) => !prev);
          if (!open) setHighlightIndex(0);
        }}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="tree"
        aria-expanded={open}
        disabled={disabled}
      >
        <Typography variant="body2" className={`${styles.value} ${selectedLabel ? styles.selected : ""}`} noWrap>
          {selectedLabel || placeholderText}
        </Typography>
        <ChevronDownIcon size={12} className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`} />
      </button>
      {open && createPortal(
        <Box
          ref={listRef}
          className={styles.dropdown}
          onKeyDown={handleListKeyDown}
          role="tree"
          aria-label={label}
        >
          {visibleNodes.map(({ node, depth }, i) => {
            const hasChildren = !!node.children && node.children.length > 0;
            const isExpanded = expandedIds.has(node.id);
            const isHighlighted = i === highlightIndex;
            const isLeafSelected = !hasChildren && node.id === value;
            return (
              <Box
                key={node.id}
                className={`${styles.option} ${isHighlighted ? styles.optionHighlighted : ""}`}
                role="treeitem"
                aria-expanded={hasChildren ? isExpanded : undefined}
                aria-selected={isLeafSelected}
                aria-level={depth + 1}
                style={{ paddingLeft: `${depth * 1.25 + 0.5}rem` }}
                onClick={() => {
                  if (hasChildren) {
                    toggleExpand(node.id);
                  } else {
                    selectNode(node.id);
                  }
                }}
                onPointerEnter={() => setHighlightIndex(i)}
              >
                {hasChildren ? (
                  <Box className={`${styles.toggle} ${isExpanded ? styles.toggleExpanded : ""}`}>
                    <ChevronRightIcon size={10} />
                  </Box>
                ) : (
                  <Box className={styles.togglePlaceholder} />
                )}
                {node.icon && <Box className={styles.icon}>{node.icon}</Box>}
                <Typography variant="body2" className={`${styles.optionText} ${isLeafSelected ? styles.optionTextSelected : ""}`} noWrap>
                  {node.label}
                </Typography>
              </Box>
            );
          })}
        </Box>,
        document.body
      )}
      {error && <Typography variant="caption" className={styles.error} role="alert">{error}</Typography>}
    </Box>
  );
};
