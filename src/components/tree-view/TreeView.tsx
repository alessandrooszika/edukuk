import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Box } from "../box/Box";
import { Typography } from "../typography";
import { ChevronRightIcon } from "../icons";
import type { TreeNode } from "../../utils/tree";
import { flattenTree } from "../../utils/tree";
import styles from "./TreeView.module.css";

interface TreeViewProps {
  data: TreeNode[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  defaultExpandedIds?: string[];
  className?: string;
}

export const TreeView = ({
  data,
  selectedId,
  onSelect,
  defaultExpandedIds = [],
  className = "",
}: TreeViewProps) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(defaultExpandedIds));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const treeRef = useRef<HTMLDivElement>(null);

  const visibleNodes = useMemo(() => flattenTree(data, expandedIds), [data, expandedIds]);

  const toggle = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectNode = useCallback((id: string) => {
    if (onSelect) onSelect(id);
  }, [onSelect]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!visibleNodes.length) return;
      const current = visibleNodes[focusedIndex];
      if (!current) return;

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          setFocusedIndex((i) => Math.min(i + 1, visibleNodes.length - 1));
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          setFocusedIndex((i) => Math.max(i - 1, 0));
          break;
        }
        case "ArrowRight": {
          e.preventDefault();
          if (current.node.children && !expandedIds.has(current.node.id)) {
            toggle(current.node.id);
          }
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          if (current.node.children && expandedIds.has(current.node.id)) {
            toggle(current.node.id);
          }
          break;
        }
        case "Enter":
        case " ": {
          e.preventDefault();
          if (!current.node.disabled) {
            selectNode(current.node.id);
          }
          break;
        }
        case "Home": {
          e.preventDefault();
          setFocusedIndex(0);
          break;
        }
        case "End": {
          e.preventDefault();
          setFocusedIndex(visibleNodes.length - 1);
          break;
        }
      }
    };

    const el = treeRef.current;
    if (el) {
      el.addEventListener("keydown", handleKeyDown);
      return () => el.removeEventListener("keydown", handleKeyDown);
    }
  }, [visibleNodes, focusedIndex, expandedIds, toggle, selectNode]);

  return (
    <Box
      ref={treeRef}
      className={`${styles.tree} ${className}`}
      role="tree"
      tabIndex={0}
    >
      {visibleNodes.map(({ node, depth }, index) => {
        const hasChildren = !!node.children && node.children.length > 0;
        const isExpanded = expandedIds.has(node.id);
        const isSelected = selectedId === node.id;
        const isFocused = index === focusedIndex;
        const isDisabled = !!node.disabled;

        return (
          <Box
            key={node.id}
            className={styles.node}
            role="treeitem"
            aria-expanded={hasChildren ? isExpanded : undefined}
            aria-selected={isSelected}
            aria-disabled={isDisabled}
            aria-level={depth + 1}
            style={{ paddingLeft: `${depth * 1.25 + 0.25}rem` }}
          >
            <Box
              className={`${styles.nodeRow} ${isSelected ? styles.selected : ""} ${isDisabled ? styles.disabled : ""}`}
              onClick={() => {
                if (!isDisabled) {
                  selectNode(node.id);
                  if (hasChildren) toggle(node.id);
                }
              }}
              tabIndex={-1}
              style={isFocused ? { outline: "2px solid var(--accent)", outlineOffset: "-2px" } : undefined}
            >
              {hasChildren ? (
                <Box className={`${styles.toggle} ${isExpanded ? styles.expanded : ""}`}>
                  <ChevronRightIcon size={10} />
                </Box>
              ) : (
                <Box className={styles.togglePlaceholder} />
              )}
              {node.icon && <Box className={styles.icon}>{node.icon}</Box>}
              <Typography variant="body2" className={styles.label} noWrap>{node.label}</Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
