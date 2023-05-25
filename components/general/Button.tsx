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
  let bgColor = "bg-blue-500";
  let hoverBgColor = "hover:bg-blue-700";
  let activeBgColor = "active:bg-blue-800";
  let borderColor = "border-blue-500";
  let textColor = "text-white";
  let shadow = "shadow-md";

  if (theme === "secondary") {
    bgColor = "bg-gray-500";
    hoverBgColor = "hover:bg-gray-700";
    activeBgColor = "active:bg-gray-800";
    borderColor = "border-gray-500";
    textColor = "text-white";
  } else if (theme === "danger") {
    bgColor = "bg-red-500";
    hoverBgColor = "hover:bg-red-700";
    activeBgColor = "active:bg-red-800";
    borderColor = "border-red-500";
    textColor = "text-white";
  } else if (theme === "success") {
    bgColor = "bg-green-500";
    hoverBgColor = "hover:bg-green-700";
    activeBgColor = "active:bg-green-800";
    borderColor = "border-green-500";
    textColor = "text-white";
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
