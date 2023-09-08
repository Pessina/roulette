import React, { useEffect, useRef, useState } from "react";
import { FaPalette } from "react-icons/fa";

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
  const [currentColor, setCurrentColor] = useState<string>("#ffffff");

  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleClickPalette = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  const borderClass = error
    ? "border border-error-500"
    : "border border-primary-500";
  const focusClass = "focus:border-primary-700";
  const bgClass = "bg-background-700";

  useEffect(() => {
    onChange(selectedColors);
  }, [selectedColors, onChange]);

  const removeColor = (color: string) => {
    setSelectedColors(selectedColors.filter((c) => c !== color));
  };

  const addColor = () => {
    if (currentColor) {
      setSelectedColors([...selectedColors, currentColor]);
    }
  };

  return (
    <FieldWrapper label={label} error={error} className="relative">
      <div className="relative w-full min-h-[2.5rem] flex items-center">
        <input
          type="text"
          className={`block w-full text-text-100 focus:outline-none active:ring-0 active:shadow-none focus:shadow-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 px-4 py-2 rounded-lg ${borderClass} ${focusClass} ${bgClass}`}
          placeholder="Enter HEX color"
          value={currentColor}
          onChange={(e) => setCurrentColor(e.target.value)}
          onBlur={addColor}
        />
        <button className="ml-2" onClick={handleClickPalette}>
          <FaPalette />
        </button>
        {selectedColors.map((color, index) => (
          <Badge
            key={index}
            style={{ backgroundColor: color }}
            onClick={() => removeColor(color)}
          >
            {color}
          </Badge>
        ))}
      </div>
      <div className="absolute top-0 left-0 mt-2">
        <input
          ref={colorInputRef}
          className="hidden"
          type="color"
          value={currentColor}
          onChange={(e) => setCurrentColor(e.target.value)}
          onBlur={addColor}
        />
      </div>
    </FieldWrapper>
  );
};

export default ColorPicker;
