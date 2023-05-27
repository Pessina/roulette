import React, { FC, ReactNode } from "react";

import Card from "./Card";

type ListItemProps = {
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
};

const ListItem: FC<ListItemProps> = ({
  className = "",
  leftIcon,
  rightIcon,
  children,
  onClick,
}) => {
  return (
    <Card
      className={`flex items-center py-2 px-4 ${className}`}
      onClick={onClick}
    >
      {leftIcon && <div className={`mr-4`}>{leftIcon}</div>}
      <div className="flex-1">{children}</div>
      {rightIcon && <div className={`ml-4`}>{rightIcon}</div>}
    </Card>
  );
};

export default ListItem;
