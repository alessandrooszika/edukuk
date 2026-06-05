import { type ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";

interface RevealCardProps {
  children: ReactNode;
}

export const RevealCard = ({ children }: RevealCardProps) => {
  const { ref, revealed } = useReveal<HTMLDivElement>(0, "0px 0px -40px 0px");
  return (
    <div
      ref={ref}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};
