import React, { useEffect, useRef, useState } from "react";

import FieldWrapper from "./FieldWrapper";
import Input from "./Input";

type ColorPickerProps = {
  onChange: (colors: string) => void;
  label?: string;
  error?: string;
  value?: string;
  placeholder?: string;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  onChange,
  label,
  error,
  value,
  placeholder,
}) => {
  const [currentColor, setColor] = useState<string | undefined>(value);
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setColor(value);
  }, [value]);

  const handleClickPalette = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  return (
    <FieldWrapper label={label} error={error} className="relative">
      <input
        ref={colorInputRef}
        className="h-0 w-0 opacity-0 absolute top-0 left-0"
        type="color"
        onChange={(e) => {
          setColor(e.target.value);
          onChange(e.target.value);
        }}
      />
      <Input
        value={currentColor}
        type="text"
        placeholder={placeholder}
        style={{ backgroundColor: currentColor }}
        onClick={handleClickPalette}
      />
    </FieldWrapper>
  );
};

export default ColorPicker;
