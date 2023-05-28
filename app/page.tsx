"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSpinner } from "react-icons/fa";

import { getItems } from "@/api/item";
import { Item } from "@/api/types";
import Button from "@/components/general/Button";
import { Loader } from "@/components/general/Loader";
import Roulette from "@/components/general/Roulette";
import Congratulations from "@/components/home/Congratulations";

const Home = () => {
  const { t } = useTranslation("", { keyPrefix: "homePage" });

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
      <div className="h-full flex flex-col gap-10 items-center justify-center bg-background-500 p-4">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Roulette
              prizeNumber={prizeNumber.current}
              data={items.map((item) => item.item)}
              mustStartSpinning={mustStartSpinning}
              onSpinComplete={onSpinComplete}
              i18n={{ noOptions: t("noOptions") }}
            />
            <Button
              size="large"
              onClick={onSpin}
              className="mt-8 min-w-[200px] active:scale-90 text-xl"
              disabled={items.length === 0 || mustStartSpinning}
              loading={mustStartSpinning}
              leftIcon={<FaSpinner />}
            >
              {t("spinButton")}
            </Button>
          </>
        )}
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
