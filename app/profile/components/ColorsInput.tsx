import React from "react";
import { FaTimes } from "react-icons/fa";

import Badge from "@/components/Badge";
import Button from "@/components/Button";
import ColorPicker from "@/components/Forms/ColorPicker";
import FieldWrapper from "@/components/Forms/FieldWrapper";

export type ColorsInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  error?: string;
};

export const ColorsInput: React.FC<ColorsInputProps> = ({
  value = [],
  onChange,
  label,
  error,
}) => {
  const [currentColor, setCurrentColor] = React.useState<string | undefined>(
    undefined
  );

  return (
    <div className="w-full">
      <FieldWrapper error={error} label={label}>
        <div className="flex gap-4">
          <ColorPicker onChange={setCurrentColor} />
          <Button
            type="button"
            onClick={() => {
              if (currentColor && !value.includes(currentColor)) {
                onChange([currentColor, ...value]);
                setCurrentColor(undefined);
              }
            }}
            theme="secondary"
          >
            Add Color
          </Button>
        </div>
      </FieldWrapper>
      <ul className="flex gap-2 mt-4 w-full flex-wrap">
        {value.map((color, index) => (
          <Badge
            key={index}
            style={{ backgroundColor: color }}
            className="flex gap-1 items-center hover:bg-gray-200 cursor-pointer"
            onClick={() => onChange([...value.filter((c) => c !== color)])}
          >
            <FaTimes />
            <p>{color}</p>
          </Badge>
        ))}
      </ul>
    </div>
  );
};
