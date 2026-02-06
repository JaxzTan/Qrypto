"use client";

import Link from "next/link";
import { Address } from "@scaffold-ui/components";
import { hardhat } from "viem/chains";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";

import HomeHeader from "../components/HomeHeader.component";


const Home = () => {

  return (
    <div className="mx-auto min-h-screen max-w-[412px] w-full bg-white font-inter">
      <HomeHeader />
    </div>
  )
};

export default Home;
