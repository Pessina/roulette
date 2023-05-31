import React, { ButtonHTMLAttributes, FC } from "react";
import { FaSpinner } from "react-icons/fa";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: "primary" | "secondary" | "danger" | "success";
  size?: "small" | "medium" | "large";
  className?: string;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const Button: FC<ButtonProps> = ({
  children,
  theme = "primary",
  size = "medium",
  className = "",
  loading = false,
  leftIcon,
  rightIcon,
  ...rest
}) => {
  let bgColor = "bg-primary-500";
  let hoverBgColor = "hover:bg-primary-700";
  let activeBgColor = "active:bg-primary-900";
  let borderColor = "border-primary-500";
  let textColor = "text-text-100";
  let shadow = "shadow-md";
  let padding = "px-4 py-2";

  if (theme === "secondary") {
    bgColor = "bg-secondary-500";
    hoverBgColor = "hover:bg-secondary-700";
    activeBgColor = "active:bg-secondary-900";
    borderColor = "border-secondary-500";
  } else if (theme === "danger") {
    bgColor = "bg-error-500";
    hoverBgColor = "hover:bg-error-700";
    activeBgColor = "active:bg-error-900";
    borderColor = "border-error-500";
  } else if (theme === "success") {
    bgColor = "bg-success-500";
    hoverBgColor = "hover:bg-success-700";
    activeBgColor = "active:bg-success-900";
    borderColor = "border-success-500";
  }

  if (size === "small") {
    padding = "px-3 py-1";
  } else if (size === "large") {
    padding = "px-5 py-3";
  }

  return (
    <button
      {...rest}
      className={`flex justify-center items-center gap-2 rounded-md ${padding} ${bgColor} ${borderColor} ${textColor} ${hoverBgColor} ${activeBgColor}
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-500 focus:ring-${theme}-500 ${shadow} transition-all duration-150 ${className}`}
    >
      {loading ? (
        <FaSpinner className="animate-spin" />
      ) : (
        <>
          {leftIcon}
          <span>{children}</span>
          {rightIcon}
        </>
      )}
    </button>
  );
};

export default Button;
