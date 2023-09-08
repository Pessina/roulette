import React from "react";

type FieldErrorProps = {
  message: string;
};

const FieldError: React.FC<FieldErrorProps> = ({ message }) => (
  <div className="text-error-500 text-sm mt-1">{message}</div>
);

export default FieldError;
