import React, { FC, useState } from "react";

import Button from "../general/Button";
import TextArea from "../general/TextArea";

type SidebarProps = {
  onChangeOptions: (options: string[]) => void;
  onSpin: () => void;
  className?: string;
};

const Sidebar: FC<SidebarProps> = ({ onSpin, className, onChangeOptions }) => {
  const [text, setText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div className={`${className} p-4 bg-white shadow-lg`}>
      <form
        className="flex flex-col h-full justify-between"
        onSubmit={(e) => e.preventDefault()}
      >
        <TextArea
          label="Text"
          className="min-h-[400px]"
          onChange={(e) =>
            onChangeOptions(
              e.target.value.split("\n").map((line) => line.trim())
            )
          }
        />
        <Button theme="success" onClick={onSpin}>
          Spin
        </Button>
      </form>
    </div>
  );
};

export default Sidebar;
