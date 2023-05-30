"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiPencil, BiTrash } from "react-icons/bi";
import { v4 as uuid } from "uuid";

import { addItem, getItems, removeItem, updateItem } from "@/api/item";
import { Item } from "@/api/types";
import ListItem from "@/components/general/ListItem";
import { Loader } from "@/components/general/Loader";
import {
  EditableListItem,
  FormInputs,
} from "@/components/products/EditableListItem";

const Products: FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  const [itemToEdit, setItemToEdit] = useState<Item | null>(null);
  const { t } = useTranslation("", { keyPrefix: "products" });

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      setLoading(false);
      setItems(items);
    };

    fetchItems();
  }, []);

  const handleSubmitCreate = useCallback(
    async (data: FormInputs) => {
      const newItem = {
        id: uuid(),
        item: data.itemName,
        probability: Number(data.itemProbability),
      };
      setItems([...items, newItem]);
      await addItem(newItem);
    },
    [items]
  );

  const handleEditSubmit = useCallback(
    async (data: FormInputs) => {
      if (itemToEdit) {
        const updatedItem = {
          ...itemToEdit,
          item: data.itemName,
          probability: Number(data.itemProbability),
        };
        setItems(
          items.map((item) => (item.id === itemToEdit.id ? updatedItem : item))
        );
        setItemToEdit(null);
        await updateItem(itemToEdit.id, updatedItem);
      }
    },
    [itemToEdit, items]
  );

  return (
    <main className="p-4 h-full bg-background-900 min-h-screen">
      <div className="max-w-[60%] mx-auto shadow-lg p-4 bg-background-700 text-text-500 rounded-md">
        {isLoading ? (
          <Loader className="grow text-primary-500" />
        ) : (
          <div className="flex flex-col gap-4">
            <ul className="flex flex-col gap-2 text-text-500 text-sm overflow-scroll py-4 rounded-md bg-background-500">
              {items.map((item, index) =>
                item.id === itemToEdit?.id ? (
                  <EditableListItem
                    key={index}
                    item={item}
                    onSubmit={handleEditSubmit}
                  />
                ) : (
                  <ListItem
                    leftIcon={
                      <button
                        type="button"
                        onClick={() => {
                          setItemToEdit(item);
                        }}
                        className="text-warning-500 focus:outline-none"
                      >
                        <BiPencil className="h-4 w-4" />
                      </button>
                    }
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => {
                          removeItem(item.id);
                          setItems(items.filter((i) => i.id !== item.id));
                        }}
                        className="text-error-500 focus:outline-none"
                      >
                        <BiTrash className="h-4 w-4" />
                      </button>
                    }
                    key={index}
                  >
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-text-100">{`📦 ${item.item}`}</p>{" "}
                      <p className="font-bold text-text-900">
                        {`🎲 ${t("probabilityLabel")}: ${item.probability}`}
                      </p>
                    </div>
                  </ListItem>
                )
              )}
              <EditableListItem
                item={{ id: uuid(), item: "", probability: 0 }}
                onSubmit={handleSubmitCreate}
              />
            </ul>
          </div>
        )}
      </div>
    </main>
  );
};

export default Products;
