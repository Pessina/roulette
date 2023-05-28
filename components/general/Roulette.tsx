import dynamic from "next/dynamic";
import React from "react";
import { useTranslation } from "react-i18next";

type RouletteProps = {
  data: string[];
  mustStartSpinning: boolean;
  onSpinComplete: () => void;
  className?: string;
  prizeNumber: number;
};

const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);

const Roulette: React.FC<RouletteProps> = ({
  data = [],
  mustStartSpinning,
  onSpinComplete,
  className,
  prizeNumber,
}) => {
  const { t } = useTranslation("", { keyPrefix: "roulette" });
  const colorPalette = ["#f6157c", "#0953fa", "#bd124f", "#063bbf", "#121212"];
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

  return options.length > 0 ? (
    <div id="roulette" className={`${className}`}>
      <Wheel
        spinDuration={2}
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
        fontSize={20}
        fontWeight="bold"
        fontStyle="normal"
        textDistance={60}
      />
    </div>
  ) : (
    <p className="text-500">{t("noOptions")}</p>
  );
};

export default Roulette;
