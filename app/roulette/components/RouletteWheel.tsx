import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import { getProfileData } from "@/api/profile";

type RouletteComponentI18N = {
  noOptions: string;
};

type RouletteComponentProps = {
  data: string[];
  mustStartSpinning: boolean;
  onSpinComplete: () => void;
  className?: string;
  prizeNumber: number;
  i18n?: RouletteComponentI18N;
};

const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);

const RouletteComponent: React.FC<RouletteComponentProps> = ({
  data = [],
  mustStartSpinning,
  onSpinComplete,
  className,
  prizeNumber,
  i18n,
}) => {
  const [colorPalette, setColorPalette] = useState([
    "#f6157c",
    "#0953fa",
    "#bd124f",
    "#063bbf",
    "#121212",
  ]);
  const backgroundColors = data.map(
    (_, index) => colorPalette[index % colorPalette.length]
  );
  const textColors = data.map(() => "#f2f2f2");

  const options = data.map((option, index) => ({
    option,
    style: {
      backgroundColor: backgroundColors[index],
      textColor: textColors[index],
    },
  }));

  useEffect(() => {
    const fetchProfileData = async () => {
      const result = await getProfileData();
      if (result.data) {
        setColorPalette(result.data.rouletteColors);
      }
    };
    fetchProfileData();
  }, []);

  return options.length > 0 ? (
    <div
      id="roulette"
      className={`${className} relative w-[min(70vw,70vh)] h-[min(70vw,70vh)]`}
    >
      <Wheel
        spinDuration={1.5}
        prizeNumber={prizeNumber}
        mustStartSpinning={mustStartSpinning}
        onStopSpinning={onSpinComplete}
        data={options}
        backgroundColors={backgroundColors}
        textColors={textColors}
        outerBorderColor="#040404"
        outerBorderWidth={5}
        radiusLineColor="#040404"
        radiusLineWidth={5}
        fontSize={8}
        fontWeight="bold"
        fontStyle="normal"
        textDistance={60}
        disableInitialAnimation
        pointerProps={{
          src: "/assets/images/pointer-bright.png",
          style: {
            zIndex: 7,
          },
        }}
      />
    </div>
  ) : (
    <p className="text-500">{i18n?.noOptions}</p>
  );
};

export default RouletteComponent;
