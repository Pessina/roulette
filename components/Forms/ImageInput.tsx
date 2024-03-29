import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiTrash, BiUpload } from "react-icons/bi";

interface ImageInputProps {
  label: string;
  onChange: (file: File | undefined) => void;
  previewUrl?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({
  label,
  onChange,
  previewUrl,
}) => {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (previewUrl) {
      setPreview(previewUrl);
    }
  }, [previewUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? undefined;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }

    onChange(file);
  };

  const removeImage = () => {
    setPreview("");
    onChange(undefined);
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-text-500 mb-2">
          {label}
        </label>
      )}
      {preview ? (
        <div className="relative">
          <Image
            alt="logo"
            src={preview}
            className="object-cover w-full h-32 rounded"
            width={500}
            height={500}
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-error-500 text-white rounded-full"
          >
            <BiTrash className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-text-500 rounded focus:ring-primary-500">
          <label className="cursor-pointer">
            <input
              type="file"
              onChange={handleImageChange}
              className="hidden"
            />
            <BiUpload className="h-6 w-6 text-text-500" />
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
