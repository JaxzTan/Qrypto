"use client";

import ActionGrid from "../components/ActionGrid.component";
import HomeHeader from "../components/HomeHeader.component";

const Home = () => {
  return (
    <div className="mx-auto min-h-screen max-w-[412px] w-full bg-white font-inter overflow-hidden">
      <HomeHeader />
      <ActionGrid />
    </div>
  );
};

export default Home;
