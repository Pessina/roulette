import React, { FC, HTMLAttributes, ReactNode } from "react";

type CardProps = {
  className?: string;
  children: ReactNode;
  tag?: "button" | "div" | "li";
} & HTMLAttributes<HTMLElement>;

const Card: FC<CardProps> = ({
  className = "",
  children,
  tag: Tag = "div",
  ...rest
}) => {
  return (
    <Tag {...rest} className={`rounded-lg shadow-md p-4 ${className}`}>
      {children}
    </Tag>
  );
};

export default Card;
