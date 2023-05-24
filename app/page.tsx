"use client";
import Roulette from "@/components/roulette";

const Home = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Roulette
        items={[
          "test1",
          "test2",
          "test3",
          "test4",
          "test1",
          "test2",
          "test3",
          "test4",
          "test1",
          "test2",
          "test3",
          "test4",
          "test1",
          "test2",
          "test3",
          "test4",
        ]}
        speed={10}
      />
    </div>
  );
};

export default Home;
