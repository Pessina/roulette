// Congratulations.tsx
import React from "react";
import Confetti from "react-confetti";

import { Item } from "@/api/types";
import Modal from "@/components/general/Modal";

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
          Congratulations! You won the prize:{" "}
          <span className="text-primary-500">{items[prizeNumber]?.item}</span>{" "}
          🎉
        </p>
      </Modal>
    </>
  );
};

export default Congratulations;
