"use client";
import { useCallback, useMemo, useState } from "react";

import Modal from "@/components/general/Modal";
import Roulette from "@/components/general/Roulette";
import Sidebar from "@/components/home/Sidebar";

const Home = () => {
  const [mustStartSpinning, setMustStartSpinning] = useState(false);
  const [spinOptions, setSpinOptions] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const prizeNumber = useMemo(
    () => Math.floor(Math.random() * spinOptions.length),
    [spinOptions.length]
  );

  const onSpinComplete = useCallback(() => setMustStartSpinning(false), []);

  return (
    <div className="h-full w-full flex bg-white">
      <Sidebar
        className="max-w-[400px] shrink-0 grow h-full"
        onSpin={() => setMustStartSpinning(true)}
        onChangeOptions={setSpinOptions}
      />
      <div className="grow h-full flex items-center justify-center bg-background-500">
        <Roulette
          prizeNumber={prizeNumber}
          data={spinOptions}
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
