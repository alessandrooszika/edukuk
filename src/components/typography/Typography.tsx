import type { ElementType, ReactNode, CSSProperties, HTMLAttributes } from "react";
import type { TypographyVariant } from "../../types";
import styles from "./Typography.module.css";

const defaultMapping: Record<TypographyVariant, ElementType> = {
  h1: "h1", h2: "h2", h3: "h3", h4: "h4", h5: "h5", h6: "h6",
  body1: "p", body2: "p", caption: "span", code: "code",
};

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  component?: ElementType;
  gutterBottom?: boolean;
  noWrap?: boolean;
  align?: CSSProperties["textAlign"];
  children?: ReactNode;
}

export const Typography = ({
  variant = "body1",
  component,
  gutterBottom,
  noWrap,
  align,
  className = "",
  style,
  children,
  ...rest
}: TypographyProps) => {
  const Tag = component ?? defaultMapping[variant];
  const cls = [
    styles.root,
    styles[variant],
    gutterBottom ? styles.gutterBottom : "",
    noWrap ? styles.noWrap : "",
    className,
  ].filter(Boolean).join(" ");

  const mergedStyle: CSSProperties = {
    ...(align && { textAlign: align }),
    ...style,
  };

  return (
    <Tag className={cls} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
};
