"use client";
import React, { FC, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { v4 as uuid } from "uuid";

import { addItem, getItems, removeItem } from "@/api/item";
import { Item } from "@/api/types";
import Input from "@/components/general/Input";
import ListItem from "@/components/general/ListItem";
import { Loader } from "@/components/general/Loader";
import Header from "@/components/home/Header";

const Products: FC = () => {
  const [input, setInput] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      setLoading(false);
      setItems(items);
    };

    fetchItems();
  }, []);

  const onChangeOptions = (options: Item[]) => {
    setItems(options);
  };

  return (
    <div className="flex flex-col min-h-screen h-fit bg-background-900">
      <Header className="shrink-0 sticky top-0" />
      <main className="p-4 flex-grow">
        <div className="max-w-screen-lg mx-auto shadow-lg p-4 bg-background-700 text-text-500 rounded-md">
          {isLoading ? (
            <Loader className="grow text-primary-500" />
          ) : (
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <ul className="flex flex-col gap-2 text-text-500 text-sm overflow-scroll py-4 rounded-md bg-background-500">
                {items.map((item, index) => (
                  <ListItem
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => {
                          removeItem(item.id);
                          onChangeOptions(
                            items.filter((i) => i.id !== item.id)
                          );
                        }}
                        className="text-error-500 focus:outline-none"
                      >
                        <BiTrash className="h-4 w-4" />
                      </button>
                    }
                    key={index}
                  >
                    {item.item}
                  </ListItem>
                ))}
                <ListItem
                  leftIcon={
                    <button
                      onClick={async () => {
                        if (input === "") return;

                        setInput("");
                        addItem(input);
                        onChangeOptions([
                          ...items,
                          { id: uuid(), item: input },
                        ]);
                      }}
                      className="text-primary-500 focus:outline-none"
                    >
                      <AiOutlinePlus className="h-4 w-4" />
                    </button>
                  }
                >
                  <Input
                    theme="none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="text-text-500 bg-background-700"
                    placeholder="Add an option"
                  />
                </ListItem>
              </ul>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default Products;
