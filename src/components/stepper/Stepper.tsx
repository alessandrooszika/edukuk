import styles from "./Stepper.module.css";

interface StepperProps {
  steps: string[];
  activeStep: number;
  orientation?: "horizontal" | "vertical";
  alternativeLabel?: boolean;
  className?: string;
}

export const Stepper = ({
  steps,
  activeStep,
  orientation = "horizontal",
  alternativeLabel = false,
  className = "",
}: StepperProps) => {
  return (
    <nav
      className={`${styles.root} ${styles[orientation]} ${alternativeLabel ? styles.alternativeLabel : ""} ${className}`}
      aria-label="Progreso"
    >
      <ol className={styles.stepList}>
        {steps.map((label, i) => {
          const isCompleted = i < activeStep;
          const isActive = i === activeStep;
          const isLast = i === steps.length - 1;

          return (
            <li
              key={i}
              className={`${styles.step} ${isActive ? styles.active : ""} ${isCompleted ? styles.completed : ""}`}
              aria-current={isActive ? "step" : undefined}
            >
              <div className={styles.stepContent}>
                <span className={styles.circle}>
                  {isCompleted ? (
                    <span className={styles.checkmark} aria-hidden="true">✓</span>
                  ) : (
                    i + 1
                  )}
                </span>
                <span className={styles.label}>{label}</span>
              </div>
              {!isLast && (
                <div
                  className={`${styles.connector} ${isCompleted ? styles.connectorCompleted : ""}`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
