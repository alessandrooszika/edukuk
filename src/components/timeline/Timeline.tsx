import type { ReactNode } from "react";
import type { Variant } from "../../types";
import styles from "./Timeline.module.css";

interface TimelineItem {
  title: string;
  description?: string;
  time?: string;
  icon?: ReactNode;
  color?: Variant;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline = ({ items, className = "" }: TimelineProps) => {
  return (
    <div className={`${styles.root} ${className}`}>
      {items.map((item, i) => (
        <div key={i} className={`${styles.item} ${item.color ? styles[item.color] : ""}`}>
          <div className={styles.dot}>
            {item.icon ? (
              <span className={styles.dotIcon}>{item.icon}</span>
            ) : (
              <span className={styles.dotInner} />
            )}
          </div>
          <div className={styles.content}>
            <p className={styles.title}>{item.title}</p>
            {item.time && <span className={styles.time}>{item.time}</span>}
            {item.description && <p className={styles.description}>{item.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};
