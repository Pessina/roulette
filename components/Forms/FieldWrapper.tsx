import React from "react";

import FieldError from "./FieldError";
import Label from "./Label";

type FieldWrapperProps = {
  label?: string;
  error?: string;
  children: React.ReactNode;
};

const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  error,
  children,
}) => (
  <div>
    {label && <Label text={label} />}
    {children}
    {error && <FieldError message={error} />}
  </div>
);

export default FieldWrapper;
