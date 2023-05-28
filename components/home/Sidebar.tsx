import Image from "next/image";
import React, { FC, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { v4 as uuid } from "uuid";

import { addItem, removeItem } from "@/api/item";
import { Item } from "@/api/types";

import Button from "../general/Button";
import Input from "../general/Input";
import ListItem from "../general/ListItem";
import { Loader } from "../general/Loader";

type SidebarProps = {
  onChangeOptions: (options: Item[]) => void;
  onSpin: () => void;
  className?: string;
  isLoading: boolean;
  items: Item[];
  disabled?: boolean;
};

const Sidebar: FC<SidebarProps> = ({
  onSpin,
  className,
  onChangeOptions,
  isLoading,
  items,
  disabled,
}) => {
  const [input, setInput] = useState("");

  return (
    <div
      className={`${className} p-4 shadow-lg bg-background-900 flex flex-col gap-4 overflow-hidden`}
    >
      <Image
        src="/logo.png"
        alt="logo"
        width={400}
        height={400}
        className="shrink-0 self-center"
      />
      {isLoading ? (
        <Loader className="grow" />
      ) : (
        <form
          className="flex flex-col h-full justify-between grow overflow-hidden"
          onSubmit={(e) => e.preventDefault()}
        >
          <ul className="flex flex-col gap-2 text-text-700 tex-sm grow overflow-scroll py-4">
            {items.map((item, index) => (
              <ListItem
                className="bg-background-500"
                rightIcon={
                  <button
                    type="button"
                    onClick={() => {
                      removeItem(item.id);
                      onChangeOptions(items.filter((i) => i.id !== item.id));
                    }}
                  >
                    <BiTrash className="h-4 w-4 text-text-900 flex items-center" />
                  </button>
                }
                key={index}
              >
                {item.item}
              </ListItem>
            ))}
            <ListItem
              className="bg-background-500"
              leftIcon={
                <button
                  onClick={async () => {
                    if (input === "") return;

                    setInput("");
                    addItem(input);
                    onChangeOptions([...items, { id: uuid(), item: input }]);
                  }}
                  className="text-text-900 flex items-center"
                >
                  <AiOutlinePlus className="h-4 w-4" />
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
            disabled={disabled}
            theme="primary"
            onClick={onSpin}
            className="shrink-0 mt-4"
          >
            Spin
          </Button>
        </form>
      )}
    </div>
  );
};

export default Sidebar;
