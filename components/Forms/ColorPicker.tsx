import React, { useEffect, useState } from "react";

import Badge from "../Badge";
import FieldWrapper from "./FieldWrapper";

type ColorPickerProps = {
  onChange: (colors: string[]) => void;
  label?: string;
  error?: string;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  onChange,
  label,
  error,
}) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [pickerKey, setPickerKey] = useState(Math.random().toString());

  useEffect(() => {
    onChange(selectedColors);
  }, [selectedColors, onChange]);

  const addColor = (color: string) => {
    setSelectedColors([...selectedColors, color]);
    setPickerKey(Math.random().toString());
  };

  const removeColor = (color: string, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setSelectedColors(selectedColors.filter((c) => c !== color));
  };

  return (
    <FieldWrapper label={label} error={error}>
      <div className="relative w-full min-h-[2.5rem]">
        <div className="absolute top-0 left-0 w-full h-full">
          <input
            type="color"
            onChange={(e) => addColor(e.target.value)}
            className="cursor-pointer w-full h-full opacity-0"
            key={pickerKey}
          />
        </div>
        <div className="block w-full px-4 py-2 text-text-100 border rounded-lg focus:outline-none active:ring-0 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 bg-background-700 border-primary-500 focus:border-primary-700">
          {selectedColors.map((color, index) => (
            <Badge
              key={index}
              style={{ backgroundColor: color }}
              onClick={(e) => removeColor(color, e)}
            >
              {color}
            </Badge>
          ))}
        </div>
      </div>
    </FieldWrapper>
  );
};

export default ColorPicker;
