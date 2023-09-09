import dynamic from "next/dynamic";
import React from "react";

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
  colorPalette?: string[];
};

const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);

const defaultColorPalette = [
  "#f6157c",
  "#0953fa",
  "#bd124f",
  "#063bbf",
  "#121212",
];

const RouletteComponent: React.FC<RouletteComponentProps> = ({
  data = [],
  mustStartSpinning,
  onSpinComplete,
  className,
  prizeNumber,
  i18n,
  colorPalette = [],
}) => {
  const finalColorPalette =
    colorPalette?.length > 0 ? colorPalette : defaultColorPalette;
  const backgroundColors = data.map(
    (_, index) => finalColorPalette[index % finalColorPalette.length]
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
