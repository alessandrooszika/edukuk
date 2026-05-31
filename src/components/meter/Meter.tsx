import styles from "./Meter.module.css";

interface MeterProps {
  value: number;
  min?: number;
  max?: number;
}

export const Meter = ({ value, min, max }: MeterProps) => (
  <meter className={styles.meter} value={value} min={min} max={max} />
);
