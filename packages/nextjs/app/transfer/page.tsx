"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { CONTACTS } from "~~/data/contacts";
import type { Contact } from "~~/data/contacts";

const TransferPage: NextPage = () => {
  const [selected, setSelected] = useState<Contact | null>(null);
  const [amount, setAmount] = useState("");

  const handleTransfer = () => {
    if (!selected || !amount) return;
    alert(`Transferring ${amount} USDC to ${selected.name}`);
  };

  return (
    <div className="flex flex-col h-full w-full px-3 py-3">
      <p className="text-center text-lg font-bold mb-1">Transfer</p>

      {/* Toggle ENS / Address */}
      <div className="flex justify-center mb-2">
        <div className="btn-group">
          <span className="btn btn-xs btn-primary">ENS</span>
          <Link href="/transfer_without_ens" className="btn btn-xs btn-outline">
            Address
          </Link>
        </div>
      </div>

      {/* Contacts List */}
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
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-primary/30 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-primary">{contact.name.charAt(0)}</span>
            </div>
            {/* Info */}
            <div className="min-w-0 text-left">
              <p className="text-sm font-semibold leading-tight">{contact.name}</p>
              <p className="text-xs opacity-50 truncate">
                {contact.ensName || `${contact.address.slice(0, 6)}...${contact.address.slice(-4)}`}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Amount + Transfer */}
      {selected && (
        <div className="mt-auto">
          <div className="bg-base-200 rounded-lg p-2 mb-2 text-sm">
            To: <span className="font-bold">{selected.name}</span>
            <span className="opacity-50 ml-1 text-xs">{selected.ensName}</span>
          </div>
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

export default TransferPage;
