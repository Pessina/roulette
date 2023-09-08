import React from "react";

import FieldError from "./FieldError";
import Label from "./Label";

type FieldWrapperProps = {
  label?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  error,
  children,
  className = "",
}) => (
  <div className={className}>
    {label && <Label text={label} />}
    {children}
    {error && <FieldError message={error} />}
  </div>
);

export default FieldWrapper;
