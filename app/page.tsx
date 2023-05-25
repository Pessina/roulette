"use client";
import { useState } from "react";

import Roulette from "@/components/general/Roulette";
import Sidebar from "@/components/home/Sidebar";

const Home = () => {
  const [mustStartSpinning, setMustStartSpinning] = useState(false);
  const [spinOptions, setSpinOptions] = useState<string[]>([]);

  return (
    <div className="h-full w-full flex bg-white">
      <Sidebar
        className="max-w-[400px] shrink-0 grow h-full"
        onSpin={(options) => {
          setMustStartSpinning(true);
          setSpinOptions(options);
        }}
      />
      <div className="grow h-full flex items-center justify-center">
        <Roulette
          data={spinOptions}
          mustStartSpinning={mustStartSpinning}
          onSpinComplete={() => setMustStartSpinning(false)}
        />
      </div>
    </div>
  );
};

export default Home;
