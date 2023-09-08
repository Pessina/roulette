import React from "react";

type LabelProps = {
  text: string;
};

const Label: React.FC<LabelProps> = ({ text }) => (
  <label className="block mb-2 text-text-100">{text}</label>
);

export default Label;
