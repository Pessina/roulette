import React, { FC } from "react";

type LoaderProps = {
  className?: string;
};

export const Loader: FC<LoaderProps> = ({ className }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  );
};
