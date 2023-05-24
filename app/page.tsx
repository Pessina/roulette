"use client";
import Roulette from "@/components/roulette";

const Home = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Roulette
        items={[
          "product 1",
          "product 2",
          "product 3",
          "product 4",
          "product 5",
          "product 6",
          "product 7",
          "product 8",
          "product 9",
          "product 10 product 10",
          "product 11 product 11",
          "product 12 product 12",
          "product 13 product 13",
          "product 14 product 14",
          "product 15 product 15 product 15",
        ]}
        speed={10}
        size={500}
        colors={["red", "blue", "green", "yellow"]}
        textSize={"text-lg"}
        textOffset={0}
      />
    </div>
  );
};

export default Home;
