"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSpinner } from "react-icons/fa";

import { getItems } from "@/api/item";
import { getProfileData } from "@/api/profile";
import { Item } from "@/api/types";
import Congratulations from "@/app/roulette/components/Congratulations";
import Button from "@/components/Button";
import { Loader } from "@/components/Loader";
import { useAuth } from "@/hooks/use-auth";
import { weightedRandom } from "@/utils/weightedRandom";

import RouletteWheel from "./components/RouletteWheel";

const Roulette = () => {
  const { t } = useTranslation("", { keyPrefix: "roulettePage" });

  const [mustStartSpinning, setMustStartSpinning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  const [rouletteColors, setRouletteColors] = useState<string[]>([]);
  let prizeNumber = useRef(0);
  const canSpin = items.length > 0 && !mustStartSpinning;

  useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const { data: items = [] } = await getItems();
      const { data: profileData } = await getProfileData();
      profileData && setRouletteColors(profileData.rouletteColors);
      setItems(items);
      setIsLoading(false);
      prizeNumber.current = weightedRandom(items);
    };

    fetchData();
  }, []);

  const onSpin = useCallback(() => {
    setMustStartSpinning(true);
    prizeNumber.current = weightedRandom(items);
  }, [items]);

  const onSpinComplete = useCallback(() => {
    setMustStartSpinning(false);
    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === "Enter" || e.code === "Space") && canSpin) {
        if (isModalOpen) {
          setIsModalOpen(false);
        } else {
          onSpin();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [items, onSpin, mustStartSpinning, canSpin, isModalOpen]);

  return (
    <>
      <div className="h-full flex flex-col gap-10 items-center justify-center bg-background-500 p-4">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <RouletteWheel
              prizeNumber={prizeNumber.current}
              data={items.map((item) => item.item)}
              mustStartSpinning={mustStartSpinning}
              onSpinComplete={onSpinComplete}
              i18n={{ noOptions: t("noOptions") }}
              colorPalette={rouletteColors}
            />
            <Button
              size="large"
              onClick={onSpin}
              className="mt-8 min-w-[200px] active:scale-90 text-xl"
              disabled={!canSpin}
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

export default Roulette;
