"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { WagmiProvider, useAccount } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

const DisconnectRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isConnected } = useAccount();
  const wasConnected = useRef(true);

  useEffect(() => {
    if (wasConnected.current && !isConnected && pathname !== "/") {
      router.push("/");
    }
    wasConnected.current = isConnected;
  }, [isConnected, pathname, router]);

  return null;
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DisconnectRedirect />
      <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
        <div
          className="flex flex-col bg-white shadow-2xl rounded-3xl overflow-hidden"
          style={{
            width: "412px",
            height: "917px",
            maxWidth: "100vw",
            maxHeight: "100vh",
          }}
        >
          <Header />
          <main className="relative flex flex-col flex-1 overflow-y-auto">{children}</main>
          <Footer />
        </div>
      </div>
      <Toaster />
    </>
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          avatar={BlockieAvatar}
          theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
        >
          <ProgressBar height="3px" color="#2299dd" />
          <ScaffoldEthApp>{children}</ScaffoldEthApp>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
