"use client";

import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import CurrencySelector from "./CurrencySelector.component";
import Profile from "./Profile.component";

const HomeHeader = () => {
  return (
    <header className="relative flex h-[504px] w-full flex-col items-center overflow-hidden bg-gradient-to-r from-[#A1E1F4] via-[rgba(89,213,190,0.52)] to-[rgba(68,170,200,0.79)] pt-7 px-4">
      <CurrencySelector />
      <Profile />
      <RainbowKitCustomConnectButton />
    </header>
  );
};

export default HomeHeader;
