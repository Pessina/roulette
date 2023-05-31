import { yupResolver } from "@hookform/resolvers/yup";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import * as yup from "yup";

import { Item } from "@/api/types";
import Input from "@/components/Input";

import { CardListItem } from "../../../components/CardListItem";

export type FormInputs = {
  itemName: string;
  itemProbability: string;
};

export type EditableListItemProps = {
  item: Item;
  onSubmit: (data: FormInputs) => void;
  type: "create" | "edit";
  isLoading: boolean;
};

export const EditableListItem: React.FC<EditableListItemProps> = ({
  item,
  onSubmit,
  type,
  isLoading,
}) => {
  const { t } = useTranslation("", { keyPrefix: "products" });

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
    setFocus,
    reset,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      itemName: item.item,
      itemProbability: !!item.probability ? String(item.probability) : "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        setFocus("itemName");
        reset({
          itemName: "",
          itemProbability: "",
        });
      })}
    >
      <CardListItem
        leftIcon={
          isLoading ? (
            <FaSpinner className="animate-spin h-4 w-4 text-primary-500" />
          ) : (
            <button
              type="submit"
              className="text-primary-500 focus:outline-none"
            >
              {type === "create" ? (
                <AiOutlinePlus className="h-4 w-4" />
              ) : (
                <AiOutlineCheck className="h-4 w-4" />
              )}
            </button>
          )
        }
      >
        <div className="flex gap-4">
          <Input
            autoFocus
            {...register("itemName")}
            label={`📦 ${t("itemLabel")}`}
            theme="none"
            error={errors.itemName?.message}
            className="text-primary-500 bg-background-700"
            placeholder={t("addItem") ?? ""}
          />
          <Input
            {...register("itemProbability")}
            label={`🎲 ${t("probabilityLabel")}`}
            theme="none"
            error={errors.itemProbability?.message}
            className="text-secondary-500 bg-background-700"
            placeholder={t("addProbability") ?? ""}
          />
        </div>
      </CardListItem>
    </form>
  );
};
