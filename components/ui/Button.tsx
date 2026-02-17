import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "hub" | "fill-amber" | "fill-ink" | "outline" | "outline-light";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  className?: string;
  icon?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  icon = false,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center gap-2 rounded-full font-sans font-semibold transition-all duration-300 ease-supplied cursor-pointer decoration-0";
  
  let variantStyles = "";
  switch (variant) {
    case "primary":
      variantStyles = "bg-supplied-ink text-supplied-white hover:bg-supplied-amber hover:-translate-y-px hover:shadow-supplied-md";
      break;
    case "hub":
      variantStyles = "bg-supplied-amber-10 text-supplied-amber hover:bg-supplied-amber hover:text-supplied-white";
      break;
    case "fill-amber":
      variantStyles = "bg-supplied-amber text-supplied-white hover:bg-supplied-amber-deep hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(232,121,28,0.25)]";
      break;
    case "fill-ink":
      variantStyles = "bg-supplied-ink text-supplied-white hover:bg-supplied-ink-80 hover:-translate-y-0.5 hover:shadow-supplied-lg";
      break;
    case "outline":
      variantStyles = "bg-transparent text-supplied-ink border-1.5 border-supplied-ink-10 hover:border-supplied-ink-20 hover:bg-supplied-ink-05";
      break;
    case "outline-light":
      variantStyles = "bg-transparent text-white/75 border-1.5 border-white/12 hover:border-supplied-amber hover:text-supplied-amber";
      break;
  }

  let sizeStyles = "";
  switch (size) {
    case "sm":
      sizeStyles = "px-5 py-2 text-[13px]";
      break;
    case "md":
      sizeStyles = "px-[30px] py-[14px] text-sm";
      break;
    case "lg":
      sizeStyles = "px-9 py-4 text-[15px]";
      break;
  }

  const combinedClassName = `${baseStyles} ${variantStyles} ${sizeStyles} ${className} group`;

  const content = (
    <>
      {children}
      {icon && <span className="transition-transform duration-300 ease-supplied group-hover:translate-x-[3px]">→</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClassName} {...(props as any)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {content}
    </button>
  );
}
