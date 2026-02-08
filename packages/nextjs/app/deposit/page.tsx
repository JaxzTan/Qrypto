"use client";

import { useState } from "react";
import type { NextPage } from "next";

const DepositPage: NextPage = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const num = parseFloat(value);
    if (value && (isNaN(num) || num < 10)) {
      setError("Minimum deposit is 10 USDC");
    } else {
      setError("");
    }
  };

  const handleDeposit = () => {
    const num = parseFloat(amount);
    if (isNaN(num) || num < 10) return;
    alert(`Depositing ${amount} USDC`);
  };

  return (
    <div className="flex flex-col h-full w-full px-3 py-3">
      <p className="text-center text-lg font-bold mb-4">Deposit</p>

      <div className="flex flex-col items-center gap-4 flex-1">
        {/* Amount Input */}
        <div className="w-full">
          <span className="text-xs font-semibold">Amount (USDC)</span>
          <div className="relative mt-1">
            <input
              type="number"
              className={`input input-bordered w-full pr-16 ${error ? "input-error" : ""}`}
              placeholder="Min 10 USDC"
              value={amount}
              onChange={e => handleAmountChange(e.target.value)}
              min="10"
              step="0.01"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold opacity-50">USDC</span>
          </div>
          {error && <p className="text-error text-xs mt-1">{error}</p>}
        </div>

        {/* Quick amounts */}
        <div className="grid grid-cols-4 gap-2 w-full">
          {["10", "50", "100", "500"].map(v => (
            <button
              key={v}
              onClick={() => handleAmountChange(v)}
              className={`btn btn-sm ${amount === v ? "btn-primary" : "btn-outline"}`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Summary */}
        {amount && !error && (
          <div className="bg-base-200 rounded-lg p-3 w-full text-sm">
            <div className="flex justify-between">
              <span className="opacity-60">Deposit</span>
              <span className="font-bold">{amount} USDC</span>
            </div>
          </div>
        )}
      </div>

      {/* Deposit Button */}
      <div className="mt-auto pt-2">
        <button onClick={handleDeposit} disabled={!amount || !!error} className="btn btn-primary w-full">
          Deposit
        </button>
      </div>
    </div>
  );
};

export default DepositPage;
