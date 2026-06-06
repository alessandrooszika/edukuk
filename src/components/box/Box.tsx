import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties } from "react";

export interface BoxProps extends ComponentPropsWithoutRef<"div"> {
  display?: CSSProperties["display"];
  flexDirection?: CSSProperties["flexDirection"];
  flexWrap?: CSSProperties["flexWrap"];
  gap?: string | number;
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  p?: string | number;
  px?: string | number;
  py?: string | number;
  pt?: string | number;
  pr?: string | number;
  pb?: string | number;
  pl?: string | number;
  m?: string | number;
  mx?: string | number;
  my?: string | number;
  mt?: string | number;
  mr?: string | number;
  mb?: string | number;
  ml?: string | number;
  width?: string | number;
  maxWidth?: string | number;
  gridTemplateColumns?: string;
  textAlign?: CSSProperties["textAlign"];
}

const toPx = (v: string | number): string =>
  typeof v === "number" ? `${v}px` : v;

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({
    className = "",
    style,
    display,
    flexDirection,
    flexWrap,
    gap,
    alignItems,
    justifyContent,
    p, px, py, pt, pr, pb, pl,
    m, mx, my, mt, mr, mb, ml,
    width,
    maxWidth,
    gridTemplateColumns,
    textAlign,
    ...rest
  }, ref) => {
    const merged: CSSProperties = {
      ...(display && { display }),
      ...(flexDirection && { flexDirection }),
      ...(flexWrap && { flexWrap }),
      ...(gap != null && { gap: toPx(gap) }),
      ...(alignItems && { alignItems }),
      ...(justifyContent && { justifyContent }),
      ...(p != null && { padding: toPx(p) }),
      ...(px != null && { paddingLeft: toPx(px), paddingRight: toPx(px) }),
      ...(py != null && { paddingTop: toPx(py), paddingBottom: toPx(py) }),
      ...(pt != null && { paddingTop: toPx(pt) }),
      ...(pr != null && { paddingRight: toPx(pr) }),
      ...(pb != null && { paddingBottom: toPx(pb) }),
      ...(pl != null && { paddingLeft: toPx(pl) }),
      ...(m != null && { margin: toPx(m) }),
      ...(mx != null && { marginLeft: toPx(mx), marginRight: toPx(mx) }),
      ...(my != null && { marginTop: toPx(my), marginBottom: toPx(my) }),
      ...(mt != null && { marginTop: toPx(mt) }),
      ...(mr != null && { marginRight: toPx(mr) }),
      ...(mb != null && { marginBottom: toPx(mb) }),
      ...(ml != null && { marginLeft: toPx(ml) }),
      ...(width != null && { width: toPx(width) }),
      ...(maxWidth != null && { maxWidth: toPx(maxWidth) }),
      ...(gridTemplateColumns && { gridTemplateColumns }),
      ...(textAlign && { textAlign }),
      ...style,
    };

    return <div ref={ref} className={className} style={merged} {...rest} />;
  }
);
Box.displayName = "Box";
