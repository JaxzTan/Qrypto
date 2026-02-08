"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Address } from "@scaffold-ui/components";
import type { NextPage } from "next";
import { parseUnits } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const PaymentPage: NextPage = () => {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [usdcToMyrRate, setUsdcToMyrRate] = useState<number>(4.45);
  const [isLoadingRate, setIsLoadingRate] = useState<boolean>(true);
  const [rateError, setRateError] = useState<string>("");

  const { writeContractAsync, isPending } = useScaffoldWriteContract({
    contractName: "YourContract",
  });

  const recipientName = "Jaxz Tan";
  const recipientAddress = "0x1234567890123456789012345678901234567890" as `0x${string}`;

  const presetAmounts = ["10", "50", "100", "500", "1000"];

  useEffect(() => {
    const fetchUSDCRate = async () => {
      try {
        setIsLoadingRate(true);
        setRateError("");
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=myr");

        if (!response.ok) throw new Error("Failed to fetch exchange rate");

        const data = await response.json();
        const rate = data["usd-coin"]?.myr;

        if (rate && typeof rate === "number") {
          setUsdcToMyrRate(rate);
        } else {
          throw new Error("Invalid rate data");
        }
      } catch (error) {
        console.error("Error fetching USDC rate:", error);
        setRateError("Fallback rate");
      } finally {
        setIsLoadingRate(false);
      }
    };

    fetchUSDCRate();
    const interval = setInterval(fetchUSDCRate, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const convertMYRtoUSDC = (myrAmount: string): string => {
    const myr = parseFloat(myrAmount);
    if (isNaN(myr)) return "0";
    return (myr / usdcToMyrRate).toFixed(2);
  };

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
      const myrAmount = isCustom ? customAmount : selectedAmount;

      if (!myrAmount || parseFloat(myrAmount) <= 0) {
        alert("Please select or enter a valid amount");
        return;
      }

      if (!description.trim()) {
        alert("Please enter a message");
        return;
      }

      const usdcAmount = convertMYRtoUSDC(myrAmount);
      const usdcValue = parseUnits(usdcAmount, 6);

      await writeContractAsync({
        functionName: "setGreeting",
        args: [description],
        value: usdcValue,
      });

      const params = new URLSearchParams({
        amount: myrAmount,
        usdc: usdcAmount,
        recipient: recipientName,
      });
      router.push(`/payment-successful?${params.toString()}`);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const getSelectedAmountValue = () => (isCustom ? customAmount : selectedAmount);

  const getUSDCAmount = () => {
    const myrAmount = getSelectedAmountValue();
    return myrAmount ? convertMYRtoUSDC(myrAmount) : "";
  };

  return (
    <div className="flex flex-col h-full w-full px-3 py-3">
      <p className="text-center text-lg font-bold mb-2">USDC Payment</p>

      {/* Recipient */}
      <div className="bg-base-200 p-2 rounded-lg mb-2 flex items-center gap-2 overflow-x-hidden">
        <div className="min-w-0">
          <span className="text-xs opacity-60">To:</span>
          <p className="font-bold text-sm leading-tight">{recipientName}</p>
          <div className="text-xs truncate">
            <Address address={recipientAddress} />
          </div>
        </div>
      </div>

      {/* Amount */}
      <div className="mb-2">
        <span className="text-xs font-semibold">Amount (MYR)</span>
        <div className="grid grid-cols-3 gap-1.5 mt-1">
          {presetAmounts.map(amount => (
            <button
              key={amount}
              onClick={() => handleAmountSelect(amount)}
              className={`btn btn-xs ${selectedAmount === amount && !isCustom ? "btn-primary" : "btn-outline"}`}
            >
              RM {amount}
            </button>
          ))}
          <button
            onClick={handleCustomAmountToggle}
            className={`btn btn-xs ${isCustom ? "btn-primary" : "btn-outline"}`}
          >
            Custom
          </button>
        </div>

        {isCustom && (
          <input
            type="number"
            className="input input-bordered input-xs w-full mt-1.5"
            placeholder="Amount in MYR"
            value={customAmount}
            onChange={e => setCustomAmount(e.target.value)}
            min="0"
            step="0.01"
          />
        )}

        {getSelectedAmountValue() && (
          <div className="bg-info/10 rounded-lg px-3 py-1.5 mt-1.5 text-sm">
            <span className="font-semibold">RM {getSelectedAmountValue()}</span>
            <span className="opacity-70 ml-2">{getUSDCAmount()} USDC</span>
          </div>
        )}
      </div>

      {/* Rate */}
      <div className="bg-base-200 rounded-lg px-3 py-1.5 mb-2 flex items-center justify-between text-xs">
        <span className="font-semibold">Rate</span>
        {isLoadingRate ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <span>
            1 USDC = RM {usdcToMyrRate.toFixed(2)}
            {rateError && <span className="text-warning ml-1">({rateError})</span>}
          </span>
        )}
      </div>

      {/* Message */}
      <div className="mb-2">
        <span className="text-xs font-semibold">Message</span>
        <input
          type="text"
          className="input input-bordered input-sm w-full mt-1"
          placeholder="e.g. Invoice #123"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      {/* Pay Button - pushed to bottom */}
      <div className="mt-auto pt-2">
        <button
          onClick={handleConfirmPayment}
          disabled={isPending || !getSelectedAmountValue() || !description.trim()}
          className="btn btn-primary w-full"
        >
          {isPending ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Paying...
            </>
          ) : (
            "Pay"
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
