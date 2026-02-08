"use client";

import { useState } from "react";
import { EnsPaymentInput } from "../../components/EnsPaymentInput";
import type { NextPage } from "next";

const TransferPage: NextPage = () => {
  const [recipientAddress, setRecipientAddress] = useState("");

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-8">Transfer</h1>

      <EnsPaymentInput onAddressResolved={setRecipientAddress} />

      {recipientAddress && (
        <div className="mt-6 text-center">
          <p className="mb-4">
            Sending to: {recipientAddress.slice(0, 6)}...{recipientAddress.slice(-4)}
          </p>
          <button className="btn btn-primary">Transfer USDC</button>
        </div>
      )}
    </div>
  );
};

export default TransferPage;
