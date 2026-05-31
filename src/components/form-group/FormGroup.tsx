import type { ReactNode } from "react";
import styles from "./FormGroup.module.css";

interface FormGroupProps {
  legend?: string;
  children?: ReactNode;
  className?: string;
}

export const FormGroup = ({
  legend,
  children,
  className = "",
}: FormGroupProps) => {
  return (
    <fieldset className={`${styles.group} ${className}`}>
      {legend && <legend className={styles.legend}>{legend}</legend>}
      {children}
    </fieldset>
  );
};
