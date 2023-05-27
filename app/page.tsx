"use client";
import "../firebase";

import { useCallback, useEffect, useMemo, useState } from "react";

import { getItems } from "@/api/getItems";
import { Item } from "@/api/types";
import Modal from "@/components/general/Modal";
import Roulette from "@/components/general/Roulette";
import Sidebar from "@/components/home/Sidebar";

const Home = () => {
  const [mustStartSpinning, setMustStartSpinning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      setIsLoading(false);
      setItems(items);
    };

    fetchItems();
  }, []);

  const prizeNumber = useMemo(
    () => Math.floor(Math.random() * items.length),
    [items.length]
  );

  const onSpinComplete = useCallback(() => setMustStartSpinning(false), []);

  return (
    <div className="h-full w-full flex bg-white">
      <Sidebar
        items={items}
        isLoading={isLoading}
        className="max-w-[400px] shrink-0 grow h-full"
        onSpin={() => setMustStartSpinning(true)}
        onChangeOptions={setItems}
      />
      <div className="grow h-full flex items-center justify-center bg-background-500">
        <Roulette
          prizeNumber={prizeNumber}
          data={items.map((item) => item.item)}
          mustStartSpinning={mustStartSpinning}
          onSpinComplete={() => {
            onSpinComplete();
            setIsModalOpen(true);
          }}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p className="text-gray-700">Testing text</p>
      </Modal>
    </div>
  );
};

export default Home;
