import React from "react";

interface TagProps {
  children: React.ReactNode;
  color?: "amber" | "green" | "blue" | "ink";
  pulse?: boolean;
  className?: string;
}

export function Tag({ children, color = "amber", pulse = false, className = "" }: TagProps) {
  const baseStyles = "inline-flex items-center gap-2 px-[14px] py-[6px] rounded-full text-[11.5px] font-semibold uppercase tracking-[1.8px]";
  
  let colorStyles = "";
  switch (color) {
    case "amber":
      colorStyles = "bg-supplied-amber-10 text-supplied-amber";
      break;
    case "green":
      colorStyles = "bg-supplied-green-10 text-supplied-green";
      break;
    case "blue":
      colorStyles = "bg-supplied-blue-10 text-supplied-blue";
      break;
    case "ink":
      colorStyles = "bg-supplied-ink-05 text-supplied-ink-60";
      break;
  }

  return (
    <span className={`${baseStyles} ${colorStyles} ${className}`}>
      {pulse && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-[tagPulse_2.5s_ease_infinite]" />
      )}
      {children}
    </span>
  );
}
