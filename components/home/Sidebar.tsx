import React, { FC, useEffect, useState } from "react";

import Button from "../general/Button";
import { EditIcon, PlusIcon, TrashIcon } from "../general/icons";
import Input from "../general/Input";
import ListItem from "../general/ListItem";

type SidebarProps = {
  onChangeOptions: (options: string[]) => void;
  onSpin: () => void;
  className?: string;
};

const Sidebar: FC<SidebarProps> = ({ onSpin, className, onChangeOptions }) => {
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    onChangeOptions(items);
  }, [items, onChangeOptions]);

  return (
    <div className={`${className} p-4 shadow-lg bg-background-900`}>
      <form
        className="flex flex-col h-full justify-between"
        onSubmit={(e) => e.preventDefault()}
      >
        <ul className="flex flex-col gap-2 text-text-700 tex-sm grow">
          {items.map((item, index) => (
            <ListItem
              className="bg-background-500"
              leftIcon={
                <EditIcon className="h-4 w-4 text-text-900 flex items-center" />
              }
              rightIcon={
                <button
                  type="button"
                  onClick={() =>
                    setItems((prev) => prev.filter((i) => i !== item))
                  }
                >
                  <TrashIcon className="h-4 w-4 text-text-900 flex items-center" />
                </button>
              }
              key={index}
            >
              {item}
            </ListItem>
          ))}
          <ListItem
            className="bg-background-500"
            leftIcon={
              <button
                onClick={() => {
                  setItems((prev) => [...prev, input]);
                  setInput("");
                }}
                className="text-text-900 flex items-center"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            }
          >
            <Input
              theme="none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="text-text-500 bg-background-500"
              placeholder="Add an option"
            />
          </ListItem>
        </ul>
        <Button
          theme="success"
          onClick={onSpin}
          className="shrink-0 bg-primary-500 text-text-100"
        >
          Spin
        </Button>
      </form>
    </div>
  );
};

export default Sidebar;
