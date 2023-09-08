import React, { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  styleType?: "primary" | "secondary" | "info" | "warning" | "danger";
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent) => void;
};

const Badge: React.FC<BadgeProps> = ({
  children,
  styleType = "primary",
  style,
  onClick,
}) => {
  let additionalStyles = "";

  switch (styleType) {
    case "primary":
      additionalStyles = "bg-primary-500 text-white";
      break;
    case "secondary":
      additionalStyles = "bg-secondary-500 text-white";
      break;
    case "info":
      additionalStyles = "bg-info-500 text-white";
      break;
    case "warning":
      additionalStyles = "bg-warning-500 text-white";
      break;
    case "danger":
      additionalStyles = "bg-danger-500 text-white";
      break;
  }

  return (
    <span
      style={style}
      className={`text-xs font-semibold rounded-full py-1 px-3 mx-1 cursor-pointer ${additionalStyles}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default Badge;
