import React, { FC, InputHTMLAttributes } from "react";

type InputProps = {
  theme?: "border" | "underline" | "none";
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({ theme = "border", ...rest }) => {
  let borderClass = "";
  let focusClass = "";

  switch (theme) {
    case "border":
      borderClass = "border border-gray-300";
      break;
    case "underline":
      borderClass = "border-b border-gray-300";
      break;
    case "none":
      borderClass = "";
      break;
    default:
      borderClass = "border border-gray-300";
  }

  return (
    <input
      className={`block w-full 
      focus:outline-none active:ring-0 active:shadow-none focus:shadow-none focus:ring-0 focus-visible:outline-none
      focus-visible:ring-0
      ${
        theme !== "none" ? "px-4 py-2 rounded-lg" : ""
      } ${borderClass} ${focusClass}`}
      {...rest}
    />
  );
};

export default Input;
