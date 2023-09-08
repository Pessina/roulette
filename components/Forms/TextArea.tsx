import React, { FC, TextareaHTMLAttributes } from "react";

import FieldWrapper from "./FieldWrapper";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  className?: string;
};

const TextArea: FC<TextAreaProps> = ({
  label,
  className = "",
  error,
  ...rest
}) => {
  return (
    <div className="mb-4">
      <FieldWrapper label={label} error={error}>
        <textarea
          {...rest}
          className={`${className} resize-none shadow appearance-none border rounded w-full py-2 px-3
         text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
      </FieldWrapper>
    </div>
  );
};

export default TextArea;
