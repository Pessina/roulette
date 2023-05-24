import React, { FC } from "react";

type RouletteProps = {
  items: string[];
  speed: number;
};

const Roulette: FC<RouletteProps> = ({ items, speed }) => {
  const colors = ["blue", "red"];

  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative w-64 h-64">
      <svg
        className="w-full h-full animate-spin"
        style={{ animationDuration: `${speed}s` }}
        viewBox="0 0 200 200"
      >
        {items.map((item, index) => {
          const sliceAngle = (2 * Math.PI) / items.length;
          const startAngle = index * sliceAngle;
          const endAngle = startAngle + sliceAngle;

          const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;
          const textRotation = (index + 0.5) * (360 / items.length);

          return (
            <g key={index}>
              <path
                d={`
                  M ${radius} ${radius}
                  L ${radius + radius * Math.cos(startAngle)} ${
                  radius + radius * Math.sin(startAngle)
                }
                  A ${radius} ${radius} 0 ${largeArcFlag} 1 ${
                  radius + radius * Math.cos(endAngle)
                } ${radius + radius * Math.sin(endAngle)}
                  Z
                `}
                fill={colors[index % colors.length]}
              />
              <text
                x={
                  radius + (radius / 2) * Math.cos(startAngle + sliceAngle / 2)
                }
                y={
                  radius + (radius / 2) * Math.sin(startAngle + sliceAngle / 2)
                }
                textAnchor="middle"
                dominantBaseline="central"
                transform={`rotate(${textRotation}, ${
                  radius + (radius / 2) * Math.cos(startAngle + sliceAngle / 2)
                }, ${
                  radius + (radius / 2) * Math.sin(startAngle + sliceAngle / 2)
                })`}
                fill="white"
              >
                {item}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default Roulette;
