"use client";

import { useState } from "react";
import Image from "next/image";
import { useEnsProfile } from "../hooks/useEnsProfile";

export function EnsPaymentInput({ onAddressResolved }: { onAddressResolved?: (address: string) => void }) {
  const [input, setInput] = useState("");
  const { address, name, avatar, isLoading } = useEnsProfile(input);

  // Notify parent when address resolved
  if (address && onAddressResolved) {
    onAddressResolved(address);
  }

  return (
    <div className="w-full max-w-md">
      {/* Input Field */}
      <input
        type="text"
        placeholder="Enter merchant.eth or 0x address..."
        value={input}
        onChange={e => setInput(e.target.value)}
        className="input input-bordered w-full"
      />

      {/* Loading State */}
      {isLoading && <p className="text-sm text-gray-500 mt-2">Resolving ENS...</p>}

      {/* Resolved Profile */}
      {address && !isLoading && (
        <div className="flex items-center gap-3 mt-3 p-3 bg-base-200 rounded-lg">
          <Image src={avatar || "/default-avatar.png"} alt="avatar" width={40} height={40} className="rounded-full" />
          <div>
            {name && <p className="font-bold">{name}</p>}
            <p className="text-sm font-mono text-gray-500">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
