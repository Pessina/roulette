"use client";
import "../firebase";

import { useCallback, useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

import { getItems } from "@/api/item";
import { Item } from "@/api/types";
import Modal from "@/components/general/Modal";
import Roulette from "@/components/general/Roulette";
import Sidebar from "@/components/home/Sidebar";

const Home = () => {
  const [mustStartSpinning, setMustStartSpinning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  let prizeNumber = useRef(0);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      setIsLoading(false);
      setItems(items);
      prizeNumber.current = Math.floor(Math.random() * items.length);
    };

    fetchItems();
  }, []);

  const onSpin = useCallback(() => {
    setMustStartSpinning(true);
    prizeNumber.current = Math.floor(Math.random() * items.length);
  }, [items.length]);

  const onSpinComplete = useCallback(() => {
    setMustStartSpinning(false);
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000 * 5);
  }, []);

  return (
    <div className="h-full w-full flex bg-white">
      <Sidebar
        disabled={isModalOpen}
        items={items}
        isLoading={isLoading}
        className="max-w-[400px] shrink-0 grow h-full"
        onSpin={onSpin}
        onChangeOptions={setItems}
      />
      <div className="grow h-full flex items-center justify-center bg-background-500">
        <Roulette
          prizeNumber={prizeNumber.current}
          data={items.map((item) => item.item)}
          mustStartSpinning={mustStartSpinning}
          onSpinComplete={onSpinComplete}
        />
      </div>
      {isModalOpen && window && (
        <Confetti
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
          <span className="text-primary-500">
            {items[prizeNumber.current]?.item}
          </span>{" "}
          🎉
        </p>
      </Modal>
    </div>
  );
};

export default Home;
