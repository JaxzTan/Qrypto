"use client";

import { useState } from "react";
import { Address, EtherInput } from "@scaffold-ui/components";
import type { NextPage } from "next";
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const PaymentPage: NextPage = () => {
  const [selectedAmount, setSelectedAmount] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const { writeContractAsync, isPending } = useScaffoldWriteContract({
    contractName: "YourContract",
  });

  // Hardcoded recipient
  const recipientName = "Jaxz Tan";
  const recipientAddress = "0x1234567890123456789012345678901234567890" as `0x${string}`;

  // Preset amount options (in ETH)

  const presetAmounts = ["0.01", "0.05", "0.1", "0.5", "1"];

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    setIsCustom(false);
  };

  const handleCustomAmountToggle = () => {
    setIsCustom(true);
    setSelectedAmount("");
  };

  const handleConfirmPayment = async () => {
    try {
      const amountToSend = isCustom ? customAmount : selectedAmount;

      if (!amountToSend || parseFloat(amountToSend) <= 0) {
        alert("Please select or enter a valid amount");
        return;
      }

      if (!description.trim()) {
        alert("Please enter a transaction description");
        return;
      }

      // Example: sending ETH with a contract function
      // Replace with your actual contract function
      await writeContractAsync({
        functionName: "setGreeting",
        args: [description],
        value: parseEther(amountToSend),
      });

      // Reset form after successful transaction
      setSelectedAmount("");
      setCustomAmount("");
      setDescription("");
      setIsCustom(false);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const getSelectedAmountValue = () => {
    return isCustom ? customAmount : selectedAmount;
  };

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5 w-full max-w-2xl">
        <h1 className="text-center mb-8">
          <span className="block text-4xl font-bold">Payment Page</span>
        </h1>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Recipient Section */}
            <div className="mb-6">
              <label className="label">
                <span className="label-text text-lg font-semibold">Pay To:</span>
              </label>
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="text-xl font-bold mb-2">{recipientName}</p>
                <Address address={recipientAddress} />
              </div>
            </div>

            {/* Amount Selection Section */}
            <div className="mb-6">
              <label className="label">
                <span className="label-text text-lg font-semibold">Select Amount (ETH):</span>
              </label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {presetAmounts.map(amount => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`btn ${selectedAmount === amount && !isCustom ? "btn-primary" : "btn-outline"}`}
                  >
                    {amount} ETH
                  </button>
                ))}
                <button
                  onClick={handleCustomAmountToggle}
                  className={`btn ${isCustom ? "btn-primary" : "btn-outline"}`}
                >
                  Custom
                </button>
              </div>

              {/* Custom Amount Input */}
              {isCustom && (
                <div className="mt-4">
                  <EtherInput
                    onValueChange={value => setCustomAmount(value.valueInEth)}
                    placeholder="Enter custom amount"
                  />
                </div>
              )}

              {/* Display selected amount */}
              {getSelectedAmountValue() && (
                <div className="alert alert-info mt-4">
                  <span className="font-semibold">Selected Amount: {getSelectedAmountValue()} ETH</span>
                </div>
              )}
            </div>

            {/* Description Section */}
            <div className="mb-6">
              <label className="label">
                <span className="label-text text-lg font-semibold">Transaction Description:</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-24"
                placeholder="Enter a description for this payment (e.g., 'Payment for services', 'Invoice #123')"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            {/* Confirm Button */}
            <div className="card-actions justify-end mt-4">
              <button
                onClick={handleConfirmPayment}
                disabled={isPending || !getSelectedAmountValue() || !description.trim()}
                className="btn btn-primary btn-lg w-full"
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Processing...
                  </>
                ) : (
                  "Confirm Payment"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
