"use client";

import { useState } from "react";
import { EnsPaymentInput } from "../components/EnsPaymentInput";

export default function Home() {
  const [recipientAddress, setRecipientAddress] = useState("");

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-8">Pay with USDC</h1>

      {/* ENS Input */}
      <EnsPaymentInput onAddressResolved={setRecipientAddress} />

      {/* Payment Button */}
      {recipientAddress && (
        <button className="btn btn-primary mt-6">Send USDC to {recipientAddress.slice(0, 6)}...</button>
      )}
    </div>
  );
}
