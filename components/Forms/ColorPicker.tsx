import React, { useEffect, useRef, useState } from "react";
import { FaPalette, FaTimes } from "react-icons/fa";

import Badge from "../Badge";
import Button from "../Button";
import FieldWrapper from "./FieldWrapper";
import Input from "./Input";

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
  const [currentColor, setCurrentColor] = useState<string | undefined>(
    undefined
  );
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleClickPalette = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  useEffect(() => {
    onChange(selectedColors);
  }, [selectedColors, onChange]);

  const removeColor = (color: string) => {
    setSelectedColors(selectedColors.filter((c) => c !== color));
  };

  const addColor = () => {
    if (currentColor) {
      setSelectedColors([currentColor, ...selectedColors]);
      setCurrentColor(undefined);
    }
  };

  return (
    <FieldWrapper label={label} error={error} className="relative">
      <div className="w-full flex items-center gap-2">
        <Input
          type="text"
          placeholder="Enter HEX color"
          value={currentColor}
          style={{ backgroundColor: currentColor }}
          onChange={(e) => setCurrentColor(e.target.value)}
        />
        <button
          className="p-2 rounded hover:bg-gray-200"
          onClick={handleClickPalette}
        >
          <FaPalette />
        </button>
        <input
          ref={colorInputRef}
          className="hidden"
          type="color"
          value={currentColor}
          onChange={(e) => setCurrentColor(e.target.value)}
        />
        <Button theme="secondary" onClick={addColor}>
          Add Color
        </Button>
      </div>
      <ul className="flex gap-2 mt-4">
        {selectedColors.map((color, index) => (
          <Badge
            key={index}
            style={{ backgroundColor: color }}
            className="flex gap-1 items-center"
            onClick={() => removeColor(color)}
          >
            <FaTimes onClick={() => removeColor(color)} />
            <p>{color}</p>
          </Badge>
        ))}
      </ul>
    </FieldWrapper>
  );
};

export default ColorPicker;
