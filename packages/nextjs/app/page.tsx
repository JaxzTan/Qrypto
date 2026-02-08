"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ActionGrid from "../components/ActionGrid.component";
import HomeHeader from "../components/HomeHeader.component";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const Home = () => {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const wasConnected = useRef(isConnected);

  useEffect(() => {
    if (!wasConnected.current && isConnected) {
      router.push("/deposit");
    }
    wasConnected.current = isConnected;
  }, [isConnected, router]);

  const handleDeposit = () => {
    if (!isConnected) {
      openConnectModal?.();
    } else {
      router.push("/deposit");
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-[412px] w-full bg-white font-inter overflow-hidden">
      <HomeHeader />
      <div className="flex justify-center px-10 pt-4">
        <button onClick={handleDeposit} className="btn btn-primary btn-sm w-full">
          Deposit USDC
        </button>
      </div>
      <ActionGrid />
    </div>
  );
};

export default Home;
