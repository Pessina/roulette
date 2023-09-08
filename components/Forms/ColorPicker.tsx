import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaPalette, FaTimes } from "react-icons/fa";
import * as yup from "yup";

import Badge from "../Badge";
import Button from "../Button";
import FieldWrapper from "./FieldWrapper";
import Input from "./Input";

type ColorPickerData = {
  color: string;
};

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
  const schema = yup.object().shape({
    color: yup
      .string()
      .required()
      .matches(/^#([0-9A-F]{3}){1,2}$/i, "Must be a valid HEX color"),
  });

  const {
    handleSubmit,
    reset,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ColorPickerData>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const [selectedColors, setSelectedColors] = React.useState<string[]>([]);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleClickPalette = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  useEffect(() => {
    onChange(selectedColors);
  }, [selectedColors, onChange]);

  const onSubmit = (data: ColorPickerData) => {
    setSelectedColors([data.color, ...selectedColors]);
    reset();
  };

  const removeColor = (color: string) => {
    setSelectedColors(selectedColors.filter((c) => c !== color));
  };

  const currentColor = watch("color");

  return (
    <div>
      <FieldWrapper label={label} error={errors.color?.message || error}>
        <div className="flex items-center gap-2">
          <Input
            {...register("color")}
            type="text"
            placeholder="Enter HEX color"
            style={{ backgroundColor: currentColor }}
          />
          <button
            className="p-2 rounded hover:bg-gray-200"
            type="button"
            onClick={handleClickPalette}
          >
            <FaPalette />
          </button>
          <input
            ref={colorInputRef}
            className="hidden"
            type="color"
            onChange={(e) => setValue("color", e.target.value)}
          />
          <Button onClick={handleSubmit(onSubmit)} theme="secondary">
            Add Color
          </Button>
        </div>
      </FieldWrapper>
      <ul className="flex gap-2 mt-4">
        {selectedColors.map((color, index) => (
          <Badge
            key={index}
            style={{ backgroundColor: color }}
            className="flex gap-1 items-center hover:bg-gray-200 cursor-pointer"
            onClick={() => removeColor(color)}
          >
            <FaTimes />
            <p>{color}</p>
          </Badge>
        ))}
      </ul>
    </div>
  );
};

export default ColorPicker;
