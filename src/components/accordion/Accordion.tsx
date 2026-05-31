import type { AccordionItem } from "../../types";
import { Typography } from "../typography";
import styles from "./Accordion.module.css";

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion = ({ items }: AccordionProps) => (
  <>
    {items.map((item, index) => (
      <details key={index} className={styles.details}>
        <summary className={styles.summary}>{item.question}</summary>
        <Typography variant="body2" className={styles.answer}>{item.answer}</Typography>
      </details>
    ))}
  </>
);
