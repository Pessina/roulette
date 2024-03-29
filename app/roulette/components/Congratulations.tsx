import React from "react";
import Confetti from "react-confetti";
import { useTranslation } from "react-i18next";

import { Item } from "@/api/types";
import Modal from "@/components/Modal";

interface CongratulationsProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  items: Item[];
  prizeNumber: number;
}

const Congratulations: React.FC<CongratulationsProps> = ({
  isModalOpen,
  setIsModalOpen,
  items,
  prizeNumber,
}) => {
  const { t } = useTranslation("", { keyPrefix: "congratulations" });

  return (
    <>
      {isModalOpen && window && (
        <Confetti
          style={{ zIndex: 10 }}
          width={window?.innerWidth}
          height={window?.innerHeight}
          recycle={true}
          numberOfPieces={1000}
          onConfettiComplete={() => setIsModalOpen(false)}
        />
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p className="text-text-100 font-bold text-lg">
          {t("messagePrefix")}{" "}
          <span className="text-primary-500">{items[prizeNumber]?.item}</span>{" "}
          {t("messageSuffix")}
        </p>
      </Modal>
    </>
  );
};

export default Congratulations;
