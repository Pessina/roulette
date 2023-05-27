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
  let bgColor = "bg-primary-light";
  let hoverBgColor = "hover:bg-primary-dark";
  let activeBgColor = "active:bg-primary-darker";
  let borderColor = "border-primary-light";
  let textColor = "text-text-light";
  let shadow = "shadow-md";

  if (theme === "secondary") {
    bgColor = "bg-secondary-light";
    hoverBgColor = "hover:bg-secondary-dark";
    activeBgColor = "active:bg-secondary-darker";
    borderColor = "border-secondary-light";
    textColor = "text-text-dark";
  } else if (theme === "danger") {
    bgColor = "bg-danger-light";
    hoverBgColor = "hover:bg-danger-dark";
    activeBgColor = "active:bg-danger-darker";
    borderColor = "border-danger-light";
    textColor = "text-text-light";
  } else if (theme === "success") {
    bgColor = "bg-success-light";
    hoverBgColor = "hover:bg-success-dark";
    activeBgColor = "active:bg-success-darker";
    borderColor = "border-success-light";
    textColor = "text-text-light";
  }

  return (
    <button
      {...rest}
      className={`px-4 py-2 rounded-lg ${bgColor} ${borderColor} ${textColor} ${hoverBgColor} ${activeBgColor}
      focus:outline-none focus:shadow-outline ${shadow} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
