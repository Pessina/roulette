"use client";
import "../firebase";

import { useCallback, useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";

import { getItems } from "@/api/item";
import { Item } from "@/api/types";
import Button from "@/components/general/Button";
import { Loader } from "@/components/general/Loader";
import Roulette from "@/components/general/Roulette";
import Congratulations from "@/components/home/Congratulations";
import Header from "@/components/home/Header";

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
  }, []);

  return (
    <>
      <div className="h-full w-full flex bg-white flex-col">
        <Header className="shrink-0 sticky top-0" />
        <div className="grow flex flex-col gap-10 items-center justify-center bg-background-500 p-4">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Roulette
                prizeNumber={prizeNumber.current}
                data={items.map((item) => item.item)}
                mustStartSpinning={mustStartSpinning}
                onSpinComplete={onSpinComplete}
              />
              <Button
                size="large"
                onClick={onSpin}
                className="mt-8 min-w-[200px] active:scale-90 text-xl"
                disabled={mustStartSpinning}
                loading={mustStartSpinning}
                leftIcon={<FaSpinner />}
              >
                Spin
              </Button>
            </>
          )}
        </div>
      </div>
      <Congratulations
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        items={items}
        prizeNumber={prizeNumber.current}
      />
    </>
  );
};

export default Home;
