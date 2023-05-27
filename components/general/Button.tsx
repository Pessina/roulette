import React, { ButtonHTMLAttributes, FC } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: "primary" | "secondary" | "danger" | "success";
  className?: string;
};

const Button: FC<ButtonProps> = ({
  children,
  theme = "primary",
  className = "",
  ...rest
}) => {
  let bgColor = "bg-primary-500";
  let hoverBgColor = "hover:bg-primary-700";
  let activeBgColor = "active:bg-primary-900";
  let borderColor = "border-primary-500";
  let textColor = "text-text-100";
  let shadow = "shadow-md";

  if (theme === "secondary") {
    bgColor = "bg-secondary-500";
    hoverBgColor = "hover:bg-secondary-700";
    activeBgColor = "active:bg-secondary-900";
    borderColor = "border-secondary-500";
    textColor = "text-text-100";
  } else if (theme === "danger") {
    bgColor = "bg-error-500";
    hoverBgColor = "hover:bg-error-700";
    activeBgColor = "active:bg-error-900";
    borderColor = "border-error-500";
    textColor = "text-text-100";
  } else if (theme === "success") {
    bgColor = "bg-success-500";
    hoverBgColor = "hover:bg-success-700";
    activeBgColor = "active:bg-success-900";
    borderColor = "border-success-500";
    textColor = "text-text-100";
  }

  return (
    <button
      {...rest}
      className={`px-4 py-2 rounded-md ${bgColor} ${borderColor} ${textColor} ${hoverBgColor} ${activeBgColor}
      focus:outline-none focus:shadow-outline ${shadow} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
