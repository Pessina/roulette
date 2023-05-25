import React, { FC, TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  className?: string;
};

const TextArea: FC<TextAreaProps> = ({ label, className = "", ...rest }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor={rest.id}>
        {label}
      </label>
      <textarea
        {...rest}
        className={`${className} resize-none shadow appearance-none border rounded w-full py-2 px-3
         text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      />
    </div>
  );
};

export default TextArea;
