import type { Variant, Size } from "../../types";
import styles from "./Table.module.css";

export interface Column {
  key: string;
  label: string;
}

interface TableProps {
  columns: Column[];
  data: Record<string, React.ReactNode>[];
  variant?: Variant;
  size?: Size;
  striped?: boolean;
  stickyHeader?: boolean;
  className?: string;
}

export const Table = ({
  columns,
  data,
  variant = "default",
  size = "md",
  striped = false,
  stickyHeader = false,
  className = "",
}: TableProps) => {
  return (
    <div className={`${styles.wrapper} ${styles[variant]} ${className}`}>
      <table className={`${styles.table} ${styles[size]} ${striped ? styles.striped : ""} ${stickyHeader ? styles.stickyHeader : ""}`}>
        <thead className={styles.thead}>
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key] ?? ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
