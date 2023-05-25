import React, { FC } from "react";

type RouletteProps = {
  items: string[];
  speed: number;
  size: number;
  colors: string[];
  textSize: string;
  textOffset: number;
  pizzaBorderColor: string;
  sliceBorderColor: string;
};

const Roulette: FC<RouletteProps> = ({
  items,
  speed,
  size,
  colors,
  textSize,
  textOffset,
  pizzaBorderColor,
  sliceBorderColor,
}) => {
  const radius = size / 2;
  const textRadius = radius - textOffset;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="w-full h-full animate-spin"
        style={{ animationDuration: `${speed}s` }}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={radius}
          cy={radius}
          r={radius}
          fill="none"
          stroke={pizzaBorderColor}
        />
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
                stroke={sliceBorderColor}
              />
              <text
                x={radius + textRadius * Math.cos(startAngle + sliceAngle / 2)}
                y={radius + textRadius * Math.sin(startAngle + sliceAngle / 2)}
                textAnchor="middle"
                dominantBaseline="central"
                transform={`rotate(${textRotation}, ${
                  radius + textRadius * Math.cos(startAngle + sliceAngle / 2)
                }, ${
                  radius + textRadius * Math.sin(startAngle + sliceAngle / 2)
                })`}
                fill="white"
                className={textSize}
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
