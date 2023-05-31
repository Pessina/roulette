"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { addItem, getItems, removeItem, updateItem } from "@/api/item";
import { Item } from "@/api/types";
import {
  EditableListItem,
  FormInputs,
} from "@/app/products/components/EditableListItem";
import { ListItem } from "@/app/products/components/ListItem";
import { Loader } from "@/components/Loader";

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
  const [loadingItems, setLoadingItems] = useState<string[]>([]);

  const fetchItems = useCallback(async () => {
    const fetchedItems = await getItems();
    setLoading(false);
    setItems(fetchedItems);
    setLoadingItems([]);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSubmitCreate = useCallback(
    async (data: FormInputs) => {
      const newItem = createNewItem(data);
      setItems([...items, newItem]);
      setLoadingItems([...loadingItems, newItem.id]);
      await addItem(newItem);
      fetchItems();
    },
    [fetchItems, items, loadingItems]
  );

  const handleEditSubmit = useCallback(
    async (data: FormInputs) => {
      if (itemToEdit) {
        const updatedItem = updateExistingItem(data, itemToEdit);
        setItems(
          items.map((item) => (item.id === itemToEdit.id ? updatedItem : item))
        );
        setLoadingItems([...loadingItems, itemToEdit.id]);
        setItemToEdit(null);
        await updateItem(itemToEdit.id, updatedItem);
        fetchItems();
      }
    },
    [fetchItems, itemToEdit, items, loadingItems]
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
                  isLoading={loadingItems.includes(item.id)}
                  onSubmit={handleEditSubmit}
                />
              ) : (
                <ListItem
                  key={item.id}
                  item={item}
                  isLoading={loadingItems.includes(item.id)}
                  onEdit={() => setItemToEdit(item)}
                  onDelete={async () => {
                    setLoadingItems([...loadingItems, item.id]);
                    await removeItem(item.id);
                    fetchItems();
                  }}
                />
              )
            )}
            <EditableListItem
              type="create"
              item={{ id: uuid(), item: "", probability: 0 }}
              onSubmit={handleSubmitCreate}
              isLoading={false}
            />
          </ul>
        )}
      </div>
    </main>
  );
};

export default Products;
