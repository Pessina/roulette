import React, { FC, useState } from "react";

type SidebarProps = {
  onSpin: (options: string[]) => void;
  className?: string;
};

const Sidebar: FC<SidebarProps> = ({ onSpin, className }) => {
  const [text, setText] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const options = text.split("\n").map((line) => line.trim());
    onSpin(options);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div className={`${className} p-4 bg-white shadow-lg`}>
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="mb-4 grow flex flex-col">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="text">
            Text
          </label>
          <textarea
            className="shadow grow max-h-[400px] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="text"
            placeholder="Enter text here"
            value={text}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Spin
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
