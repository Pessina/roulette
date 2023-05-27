// @ts-nocheck
import dynamic from "next/dynamic";
import React from "react";

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
  const backgroundColors = data.map((_, index) =>
    index % 2 === 0 ? "#bd124f" : "#063bbf"
  );

  const textColors = data.map(() => "#c0c0c0");

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
        spinDuration={0.1}
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
    <p className="text-500">No options added yet</p>
  );
};

export default Roulette;
