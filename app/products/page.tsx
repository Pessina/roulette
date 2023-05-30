"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";

import { addItem, getItems, removeItem, updateItem } from "@/api/item";
import { Item } from "@/api/types";
import { Loader } from "@/components/general/Loader";
import {
  EditableListItem,
  FormInputs,
} from "@/components/products/EditableListItem";
import { ListItem } from "@/components/products/ListItem";

const createNewItem = (data: FormInputs) => ({
  id: uuid(),
  item: data.itemName,
  probability: Number(data.itemProbability),
});

const updateExistingItem = (data: FormInputs, itemToEdit: Item) => ({
  ...itemToEdit,
  item: data.itemName,
  probability: Number(data.itemProbability),
});

const Products: FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  const [itemToEdit, setItemToEdit] = useState<Item | null>(null);
  const { t } = useTranslation("", { keyPrefix: "products" });

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await getItems();
      setLoading(false);
      setItems(fetchedItems);
    };
    fetchItems();
  }, []);

  const handleSubmitCreate = useCallback(
    async (data: FormInputs) => {
      const newItem = createNewItem(data);
      setItems([...items, newItem]);
      await addItem(newItem);
    },
    [items]
  );

  const handleEditSubmit = useCallback(
    async (data: FormInputs) => {
      if (itemToEdit) {
        const updatedItem = updateExistingItem(data, itemToEdit);
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
          <ul className="flex flex-col gap-2 text-text-500 text-sm overflow-scroll py-4 rounded-md bg-background-500">
            {items.map((item, index) =>
              item.id === itemToEdit?.id ? (
                <EditableListItem
                  type="edit"
                  key={index}
                  item={item}
                  onSubmit={handleEditSubmit}
                />
              ) : (
                <ListItem
                  key={item.id}
                  item={item}
                  onEdit={() => setItemToEdit(item)}
                  onDelete={async () => {
                    setItems(items.filter((i) => i.id !== item.id));
                    await removeItem(item.id);
                  }}
                />
              )
            )}
            <EditableListItem
              type="create"
              item={{ id: uuid(), item: "", probability: 0 }}
              onSubmit={handleSubmitCreate}
            />
          </ul>
        )}
      </div>
    </main>
  );
};

export default Products;
