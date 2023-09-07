import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaExclamationCircle, FaTimes } from "react-icons/fa";

import { deleteUserCascade } from "@/api/user";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { routes } from "@/constants/routes";

type DeleteAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DeleteAccountModal: FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const { t } = useTranslation("", { keyPrefix: "deleteAccountModal" });
  const [password, setPassword] = useState("");

  const confirmDeleteAccount = async () => {
    try {
      await deleteUserCascade();
      onClose();
      router.push(routes.LOGIN);
    } catch (error) {
      console.error("Failed to delete account:", error);
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
        <Input
          type="password"
          label={t("passwordLabel")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-2 justify-end mt-4">
          <Button theme="secondary" onClick={onClose}>
            {t("cancelButton")}
          </Button>
          <Button theme="danger" onClick={confirmDeleteAccount}>
            {t("confirmButton")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
