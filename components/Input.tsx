"use client";
import React, { ForwardRefRenderFunction, InputHTMLAttributes } from "react";

type InputProps = {
  theme?: "border" | "underline" | "none";
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { theme = "border", label, error, ...rest },
  ref
) => {
  let borderClass = "";
  let focusClass = "";
  let bgClass = "";

  switch (theme) {
    case "border":
      borderClass = error
        ? "border border-error-500"
        : "border border-primary-500";
      focusClass = "focus:border-primary-700";
      bgClass = "bg-background-700";
      break;
    case "underline":
      borderClass = error
        ? "border-b border-error-500"
        : "border-b border-primary-500";
      focusClass = "focus:border-primary-700";
      bgClass = "bg-background-700";
      break;
    case "none":
      borderClass = "";
      bgClass = "bg-transparent";
      break;
    default:
      borderClass = "border border-primary-500";
      focusClass = "focus:border-primary-700";
  }

  return (
    <div>
      {label && <label className="block mb-2 text-text-100">{label}</label>}
      <input
        ref={ref}
        {...rest}
        className={`block w-full text-text-100
        focus:outline-none active:ring-0 active:shadow-none focus:shadow-none focus:ring-0 focus-visible:outline-none
        focus-visible:ring-0
        ${
          theme !== "none" ? "px-4 py-2 rounded-lg" : ""
        } ${borderClass} ${focusClass} ${bgClass}`}
      />
      {error && <div className="text-error-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default React.forwardRef(Input);
