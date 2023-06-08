import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "md";
}

export function Button({ children, size = "md", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`
      ${size === "sm" && `p-2`}
      ${size === "md" && `px-6 py-5`}
      bg-gray-600 rounded-lg flex items-center justify-start gap-5 hover:bg-gray-500 transition-colors
      `}
    >
      {children}
    </button>
  );
}
