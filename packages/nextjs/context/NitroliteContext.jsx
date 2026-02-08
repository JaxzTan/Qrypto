'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useWalletClient, useAccount } from "wagmi";
import { NitroliteClient, WalletStateSigner } from "@erc7824/nitrolite";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

const NitroliteContext = createContext(undefined);

const NitroliteProvider = ({ children }) => {
  const { data: walletClient } = useWalletClient();
  const { chain } = useAccount();

  const wsRef = useRef(null);
  const [client, setClient] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!walletClient) return;
    if (chain?.id !== sepolia.id) return;

    // --- WebSocket (singleton) ---
    if (!wsRef.current) {
      const ws = new WebSocket("wss://clearnet-sandbox.yellow.com/ws");

      ws.onopen = () => {
        console.log("🟢 Connected to Yellow sandbox");
      };

      ws.onclose = () => {
        console.log("🔴 WS closed");
        wsRef.current = null;
        setIsReady(false);
      };

      ws.onerror = err => {
        console.error("WS error", err);
      };

      wsRef.current = ws;
    }

    // --- Public client ---
    const publicClient = createPublicClient({
      chain: sepolia,
      transport: http(process.env.ALCHEMY_RPC_URL),
    });

    // --- Nitrolite client ---
    const nitroClient = new NitroliteClient({
      publicClient,
      walletClient,
      stateSigner: new WalletStateSigner(walletClient),
      addresses: {
        custody: "0x019B65A265EB3363822f2752141b3dF16131b262",
        adjudicator: "0x7c7ccbc98469190849BCC6c926307794fDfB11F2",
      },
      chainId: sepolia.id,
      challengeDuration: 3600n,
    });

    setClient(nitroClient);
    setIsReady(true);

    return () => {
      // Optional cleanup
      // wsRef.current?.close();
      // wsRef.current = null;
    };
  }, [walletClient, chain]);

  return (
    <NitroliteContext.Provider
      value={{
        client,
        ws: wsRef.current,
        isReady,
      }}
    >
      {children}
    </NitroliteContext.Provider>
  );
};

export default NitroliteProvider;
