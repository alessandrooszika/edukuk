import { useState, useEffect, type ReactNode } from "react";
import type { Variant, Size } from "../../types";
import { HStack, VStack } from "../stack";
import { Pagination } from "../pagination";
import styles from "./DataTable.module.css";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: unknown, row: T) => ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  striped?: boolean;
  stickyHeader?: boolean;
  selectable?: boolean;
  onSelectionChange?: (selected: T[]) => void;
  variant?: Variant;
  size?: Size;
  className?: string;
}

function getValue<T>(row: T, key: string): unknown {
  return (row as Record<string, unknown>)[key];
}

function renderValue(v: unknown): string {
  if (v == null) return "";
  return String(v);
}

function matchesFilter<T>(row: T, filter: string, columns: Column<T>[]): boolean {
  if (!filter) return true;
  const q = filter.toLowerCase();
  return columns.some((col) => {
    if (col.filterable === false) return false;
    const v = renderValue(getValue(row, col.key));
    return v.toLowerCase().includes(q);
  });
}

type SortDir = "asc" | "desc" | null;

export const DataTable = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, any>,
>({
  columns,
  data,
  pageSize = 10,
  striped = false,
  stickyHeader = false,
  selectable = false,
  onSelectionChange,
  variant = "default",
  size = "md",
  className = "",
}: DataTableProps<T>) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [visibleCols, setVisibleCols] = useState<string[]>(
    columns.map((c) => c.key)
  );

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") { setSortKey(null); setSortDir(null); }
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const toggleCol = (key: string) => {
    setVisibleCols((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleRow = (idx: number) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedRows.size === filteredData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredData.map((_, i) => i)));
    }
  };

  const filteredData = (() => {
    let result = data.filter((row) => matchesFilter(row, filterText, columns));

    if (sortKey && sortDir) {
      result = [...result].sort((a, b) => {
        const aVal = getValue(a, sortKey);
        const bVal = getValue(b, sortKey);
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  })();

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const pageData = filteredData.slice((safePage - 1) * pageSize, safePage * pageSize);

  const selectedData = filteredData.filter((_, i) => selectedRows.has(i));

  useEffect(() => {
    onSelectionChange?.(selectedData);
  }, [selectedData, onSelectionChange]);

  const showCols = columns.filter((col) => visibleCols.includes(col.key));

  return (
    <VStack gap="0.75rem" className={`${styles.wrapper} ${styles[variant]} ${className}`}>
      <HStack gap="0.5rem" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <input
          type="search"
          placeholder="Buscar..."
          value={filterText}
          onChange={(e) => { setFilterText(e.target.value); setCurrentPage(1); }}
          className={styles.searchInput}
          aria-label="Filtrar tabla"
        />
        <div className={styles.colToggle}>
          <button type="button" className={styles.colToggleBtn} aria-haspopup="true">
            Columnas ▾
          </button>
          <div className={styles.colDropdown} role="menu">
            {columns.map((col) => (
              <label key={col.key} className={styles.colOption} role="menuitemcheckbox" aria-checked={visibleCols.includes(col.key)}>
                <input
                  type="checkbox"
                  checked={visibleCols.includes(col.key)}
                  onChange={() => toggleCol(col.key)}
                />
                {col.label}
              </label>
            ))}
          </div>
        </div>
      </HStack>

      <div className={`${styles.tableWrap} ${stickyHeader ? styles.sticky : ""}`}>
        <table className={`${styles.table} ${styles[size]} ${striped ? styles.striped : ""}`}>
          <thead className={styles.thead}>
            <tr>
              {selectable && (
                <th className={styles.checkCol} scope="col">
                  <input
                    type="checkbox"
                    checked={selectedRows.size > 0 && selectedRows.size === filteredData.length}
                    onChange={toggleAll}
                    aria-label="Seleccionar todas las filas"
                  />
                </th>
              )}
              {showCols.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`${styles.th} ${col.sortable ? styles.sortable : ""} ${sortKey === col.key ? styles.sorted : ""}`}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={() => col.sortable && handleSort(col.key)}
                  aria-sort={sortKey === col.key ? (sortDir === "asc" ? "ascending" : "descending") : undefined}
                >
                  <span className={styles.thInner}>
                    {col.label}
                    {col.sortable && (
                      <span className={`${styles.arrow} ${sortKey === col.key ? styles.arrowActive : ""}`}>
                        {sortKey === col.key ? (sortDir === "asc" ? "▲" : "▼") : "▲"}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={showCols.length + (selectable ? 1 : 0)} className={styles.empty}>
                  Sin resultados
                </td>
              </tr>
            ) : (
              pageData.map((row, i) => {
                const realIdx = (safePage - 1) * pageSize + i;
                return (
                  <tr
                    key={realIdx}
                    className={`${selectable && selectedRows.has(realIdx) ? styles.selected : ""}`}
                  >
                    {selectable && (
                      <td className={styles.checkCol}>
                        <input
                          type="checkbox"
                          checked={selectedRows.has(realIdx)}
                          onChange={() => toggleRow(realIdx)}
                          aria-label="Seleccionar fila"
                        />
                      </td>
                    )}
                    {showCols.map((col) => (
                      <td key={col.key} className={styles.td} style={col.width ? { width: col.width } : undefined}>
                        {col.render
                          ? col.render(getValue(row, col.key), row)
                          : renderValue(getValue(row, col.key))
                        }
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <HStack gap="0.75rem" alignItems="center" justifyContent="space-between" flexWrap="wrap">
        <span className={styles.pageInfo}>
          {filteredData.length} resultado{filteredData.length !== 1 ? "s" : ""}
          {filteredData.length > pageSize && ` · Página ${safePage} de ${totalPages}`}
        </span>
        {totalPages > 1 && (
          <Pagination current={safePage} total={totalPages} onChange={setCurrentPage} />
        )}
      </HStack>
    </VStack>
  );
};
