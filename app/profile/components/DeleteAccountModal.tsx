"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaExclamationCircle, FaTimes } from "react-icons/fa";
import * as yup from "yup";

import { deleteUserCascade } from "@/api/user";
import Button from "@/components/Button";
import Input from "@/components/Forms/Input";
import Modal from "@/components/Modal";

type DeleteAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type DeleteForm = {
  password: string;
};

const DeleteAccountModal: FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation("", { keyPrefix: "deleteAccountModal" });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const schema = yup.object().shape({
    password: yup.string().required(t("passwordRequired")),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeleteForm>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset();
    setErrorMessage("");
  }, [reset, isOpen]);

  const confirmDeleteAccount = async (data: DeleteForm) => {
    try {
      setIsLoading(true);
      await deleteUserCascade(data.password);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(t("deletionFailed"));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <FaExclamationCircle className="text-error-500 text-4xl" />
            <h2 className="text-2xl text-text-500">{t("warningTitle")}</h2>
          </div>
          <button onClick={onClose} className="p-2">
            <FaTimes className="text-text-500 hover:text-text-700" />
          </button>
        </div>
        <p className="mb-4 text-text-300">{t("warningDescription")}</p>
        <form onSubmit={handleSubmit(confirmDeleteAccount)}>
          <Input
            type="password"
            label={t("passwordLabel")}
            error={errors.password?.message || errorMessage}
            {...register("password")}
          />
          <div className="flex gap-2 justify-end mt-4">
            <Button theme="secondary" onClick={onClose}>
              {t("cancelButton")}
            </Button>
            <Button
              theme="danger"
              type="submit"
              disabled={isLoading}
              loading={isLoading}
            >
              {t("confirmButton")}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
