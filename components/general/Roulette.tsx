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
  const options = data.map((option, index) => ({
    option,
    style: {
      backgroundColor: index % 2 === 0 ? "red" : "blue",
      textColor: "white",
    },
  }));

  return options.length > 0 ? (
    <div className={className}>
      <Wheel
        spinDuration={0.1}
        prizeNumber={prizeNumber}
        mustStartSpinning={mustStartSpinning}
        onStopSpinning={onSpinComplete}
        data={options}
        backgroundColors={options.map((d) => d.style.backgroundColor)}
        textColors={options.map((d) => d.style.textColor)}
      />
    </div>
  ) : (
    <p>No options added yet</p>
  );
};

export default Roulette;
