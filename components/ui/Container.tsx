import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export function Container({ children, className = "", narrow = false }: ContainerProps) {
  const maxWidthClass = narrow ? "max-w-[800px]" : "max-w-[1440px]";
  return (
    <div className={`mx-auto w-full px-10 ${maxWidthClass} ${className}`}>
      {children}
    </div>
  );
}
