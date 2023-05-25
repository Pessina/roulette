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
        onSpin={() => setMustStartSpinning(true)}
        onChangeOptions={setSpinOptions}
      />
      <div className="grow h-full flex items-center justify-center">
        <Roulette
          key={spinOptions.join("")}
          data={spinOptions}
          mustStartSpinning={mustStartSpinning}
          onSpinComplete={() => setMustStartSpinning(false)}
        />
      </div>
    </div>
  );
};

export default Home;
