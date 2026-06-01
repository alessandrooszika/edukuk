import type { ReactNode } from "react";

export interface TreeNode {
  id: string;
  label: string;
  icon?: ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

export function flattenTree(
  nodes: TreeNode[],
  expandedIds: Set<string>
): { node: TreeNode; depth: number }[] {
  const result: { node: TreeNode; depth: number }[] = [];
  function walk(list: TreeNode[], depth: number) {
    for (const n of list) {
      result.push({ node: n, depth });
      if (n.children && expandedIds.has(n.id)) {
        walk(n.children, depth + 1);
      }
    }
  }
  walk(nodes, 0);
  return result;
}
