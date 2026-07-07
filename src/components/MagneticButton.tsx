"use client";

import { useRef, useState, ReactNode, MouseEvent, CSSProperties } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "button" | "a";
  type?: "button" | "submit" | "reset";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  title?: string;
}

export default function MagneticButton({
  children,
  className = "",
  style: externalStyle,
  as = "button",
  type,
  href,
  target,
  rel,
  onClick,
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
  title,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const maxOffset = 8;
    const x = Math.max(-maxOffset, Math.min(maxOffset, dx * 0.2));
    const y = Math.max(-maxOffset, Math.min(maxOffset, dy * 0.2));
    setTransform({ x, y });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
  };

  const style: CSSProperties = {
    ...externalStyle,
    transform: `translate(${transform.x}px, ${transform.y}px)`,
    transition: transform.x === 0 && transform.y === 0 ? "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "transform 0.1s ease-out",
  };

  const props = {
    ref: ref as React.RefObject<HTMLButtonElement & HTMLAnchorElement>,
    className,
    style,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    "data-magnetic": true,
    onClick,
    "aria-label": ariaLabel,
    "aria-expanded": ariaExpanded,
    title,
  };

  if (as === "a") {
    // Safe by default: never open a new tab without noopener/noreferrer
    const safeRel = rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);
    return <a {...props} href={href} target={target} rel={safeRel}>{children}</a>;
  }

  return <button {...props} type={type ?? "button"}>{children}</button>;
}
