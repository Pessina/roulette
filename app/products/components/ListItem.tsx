import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { BiPencil, BiTrash } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";

import { Item } from "@/api/types";
import { CardListItem } from "@/components/CardListItem";

type ListItemProps = {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
  isLoading: boolean;
};

export const ListItem: FC<ListItemProps> = ({
  item,
  onEdit,
  onDelete,
  isLoading,
}) => {
  const { t } = useTranslation("", { keyPrefix: "products" });

  return (
    <CardListItem
      leftIcon={
        <button
          disabled={isLoading}
          type="button"
          onClick={() => onEdit(item)}
          className="text-primary-500 focus:outline-none"
        >
          <BiPencil className="h-4 w-4" />
        </button>
      }
      rightIcon={
        isLoading ? (
          <FaSpinner className="animate-spin h-4 w-4" />
        ) : (
          <button
            type="button"
            onClick={() => onDelete(item)}
            className="text-error-500 focus:outline-none"
          >
            <BiTrash className="h-4 w-4" />
          </button>
        )
      }
    >
      <div className="flex flex-col gap-2">
        <p className="font-bold text-text-500">{`📦 ${item.item}`}</p>
        <p className="font-bold text-text-500">
          {`🎲 ${t("probabilityLabel")}: ${item.probability}`}
        </p>
      </div>
    </CardListItem>
  );
};
