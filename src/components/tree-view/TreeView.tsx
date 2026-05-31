import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import styles from "./TreeView.module.css";

export interface TreeNode {
  id: string;
  label: string;
  icon?: ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

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

  const visibleNodes = useMemo(() => {
    const result: { node: TreeNode; depth: number }[] = [];
    function walk(nodes: TreeNode[], depth: number) {
      for (const node of nodes) {
        result.push({ node, depth });
        if (node.children && expandedIds.has(node.id)) {
          walk(node.children, depth + 1);
        }
      }
    }
    walk(data, 0);
    return result;
  }, [data, expandedIds]);

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
    <div
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
          <div
            key={node.id}
            className={styles.node}
            role="treeitem"
            aria-expanded={hasChildren ? isExpanded : undefined}
            aria-selected={isSelected}
            aria-disabled={isDisabled}
            aria-level={depth + 1}
            style={{ paddingLeft: `${depth * 1.25 + 0.25}rem` }}
          >
            <div
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
                <span className={`${styles.toggle} ${isExpanded ? styles.expanded : ""}`}>▶</span>
              ) : (
                <span className={styles.togglePlaceholder} />
              )}
              {node.icon && <span className={styles.icon}>{node.icon}</span>}
              <span className={styles.label}>{node.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
