import React, { FC, ReactNode } from "react";

import Card from "./Card";

type CardListItemProps = {
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
};

export const CardListItem: FC<CardListItemProps> = ({
  className = "",
  leftIcon,
  rightIcon,
  children,
  onClick,
}) => {
  return (
    <Card
      className={`flex items-center py-2 px-4 gap-4 ${className}`}
      onClick={onClick}
    >
      {leftIcon}
      <div className="flex-1">{children}</div>
      {rightIcon}
    </Card>
  );
};
