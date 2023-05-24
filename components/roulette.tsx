import React from "react";

interface RouletteProps {
  items: string[];
  speed: number; // time in seconds for full rotation
}

const Roulette: React.FC<RouletteProps> = ({ items, speed }) => {
  const itemAngle = 360 / items.length;

  return (
    <div
      className="relative w-[200px] h-[200px] rounded-full bg-transparent flex items-center justify-center animate-spin"
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {items.map((item, index) => {
        const angle = itemAngle * index;
        const hue = (index / items.length) * 360;
        return (
          <div
            key={index}
            className="absolute w-[200px] h-[200px] rounded-full bg-transparent flex items-center justify-center text-center transform origin-center"
            style={{
              clipPath: `polygon(50% 50%, 100% 50%, 100% 100%, 0% 100%)`,
              backgroundColor: `hsl(${hue}, 100%, 50%)`,
              color: "white",
              transform: `rotate(${angle}deg)`,
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default Roulette;
