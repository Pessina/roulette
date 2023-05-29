"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AiOutlinePlus } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { v4 as uuid } from "uuid";
import * as yup from "yup";

import { addItem, getItems, removeItem } from "@/api/item";
import { Item } from "@/api/types";
import Input from "@/components/general/Input";
import ListItem from "@/components/general/ListItem";
import { Loader } from "@/components/general/Loader";

interface FormInputs {
  itemName: string;
  itemProbability: string;
}

const Products: FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  const { t } = useTranslation("", { keyPrefix: "products" });

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      setLoading(false);
      setItems(items);
    };

    fetchItems();
  }, []);

  const schema = useMemo(
    () =>
      yup.object().shape({
        itemName: yup.string().required(t("itemNameRequired") ?? ""),
        itemProbability: yup
          .number()
          .typeError(t("positiveProbability") ?? "")
          .positive(t("positiveProbability") ?? "")
          .required(t("probabilityRequired") ?? ""),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormInputs) => {
    const newItem = {
      id: uuid(),
      item: data.itemName,
      probability: Number(data.itemProbability),
    };
    setItems([...items, newItem]);
    await addItem(newItem);
    reset();
  };

  return (
    <main className="p-4 h-full bg-background-900 min-h-screen">
      <div className="max-w-screen-lg mx-auto shadow-lg p-4 bg-background-700 text-text-500 rounded-md">
        {isLoading ? (
          <Loader className="grow text-primary-500" />
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <ul className="flex flex-col gap-2 text-text-500 text-sm overflow-scroll py-4 rounded-md bg-background-500">
              {items.map((item, index) => (
                <ListItem
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
                  {`${item.item} - ${item.probability}`}
                </ListItem>
              ))}
              <ListItem
                leftIcon={
                  <button
                    type="submit"
                    className="text-primary-500 focus:outline-none"
                  >
                    <AiOutlinePlus className="h-4 w-4" />
                  </button>
                }
              >
                <Input
                  {...register("itemName")}
                  theme="none"
                  error={errors.itemName?.message}
                  className="text-text-500 bg-background-700"
                  placeholder={t("addItem") ?? ""}
                />
                <Input
                  {...register("itemProbability")}
                  theme="none"
                  error={errors.itemProbability?.message}
                  className="text-text-500 bg-background-700"
                  placeholder={t("addProbability") ?? ""}
                />
              </ListItem>
            </ul>
          </form>
        )}
      </div>
    </main>
  );
};

export default Products;
