import React, { FC } from "react";

type RouletteProps = {
  items: string[];
  speed: number; // in seconds
};

const Roulette: FC<RouletteProps> = ({ items, speed }) => {
  const sliceAngle = 360 / items.length;
  const colors = ["blue", "red"];

  return (
    <div
      className="w-64 h-64 relative animate-spin"
      style={{ animationDuration: `${speed}s` }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="absolute w-64 h-64 rounded-full flex items-center justify-center"
          style={{
            transform: `rotate(${sliceAngle * index}deg)`,
            clipPath: "polygon(50% 0%, 100% 0, 100% 100%, 50% 100%)",
            backgroundColor: colors[index % colors.length],
          }}
        >
          <div
            className="absolute transform text-white text-center"
            style={{
              transform: `rotate(-${sliceAngle * index}deg)`,
              width: "100%",
              textAlign: "center",
              left: 0,
            }}
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Roulette;
