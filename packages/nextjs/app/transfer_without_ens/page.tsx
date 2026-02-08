"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { CONTACTS } from "~~/data/contacts";
import type { Contact } from "~~/data/contacts";

const TransferWithoutEnsPage: NextPage = () => {
  const [selected, setSelected] = useState<Contact | null>(null);
  const [amount, setAmount] = useState("");

  const handleTransfer = () => {
    if (!selected || !amount) return;
    alert(`Transferring ${amount} USDC to ${selected.address}`);
  };

  return (
    <div className="flex flex-col h-full w-full px-3 py-3">
      <p className="text-center text-lg font-bold mb-1">Transfer</p>

      {/* Toggle ENS / Address */}
      <div className="flex justify-center mb-2">
        <div className="btn-group">
          <Link href="/transfer" className="btn btn-xs btn-outline">
            ENS
          </Link>
          <span className="btn btn-xs btn-primary">Address</span>
        </div>
      </div>

      {/* Address List */}
      <div className="flex flex-col gap-1.5 mb-3">
        {CONTACTS.map(contact => (
          <button
            key={contact.address}
            onClick={() => setSelected(contact)}
            className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
              selected?.address === contact.address
                ? "bg-primary/20 ring-1 ring-primary"
                : "bg-base-200 hover:bg-base-300"
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-primary/30 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-primary font-mono">0x</span>
            </div>
            <p className="text-sm font-mono truncate">
              {contact.address.slice(0, 6)}...{contact.address.slice(-4)}
            </p>
          </button>
        ))}
      </div>

      {/* Amount + Transfer */}
      {selected && (
        <div className="mt-auto">
          <div className="bg-base-200 rounded-lg p-2 mb-2 text-xs font-mono truncate">To: {selected.address}</div>
          <input
            type="number"
            className="input input-bordered input-sm w-full mb-2"
            placeholder="Amount (USDC)"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            min="0"
            step="0.01"
          />
          <button onClick={handleTransfer} disabled={!amount} className="btn btn-primary w-full">
            Transfer
          </button>
        </div>
      )}
    </div>
  );
};

export default TransferWithoutEnsPage;
