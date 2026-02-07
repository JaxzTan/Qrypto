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
  const [usdcToMyrRate, setUsdcToMyrRate] = useState<number>(4.45); // Default fallback rate
  const [isLoadingRate, setIsLoadingRate] = useState<boolean>(true);
  const [rateError, setRateError] = useState<string>("");

  const { writeContractAsync, isPending } = useScaffoldWriteContract({
    contractName: "YourContract",
  });

  // Hardcoded recipient
  const recipientName = "Jaxz Tan";
  const recipientAddress = "0x1234567890123456789012345678901234567890" as `0x${string}`;

  // Preset amount options (in MYR)
  const presetAmounts = ["10", "50", "100", "500", "1000"];

  // Fetch live USDC to MYR conversion rate
  useEffect(() => {
    const fetchUSDCRate = async () => {
      try {
        setIsLoadingRate(true);
        setRateError("");
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=myr");

        if (!response.ok) {
          throw new Error("Failed to fetch exchange rate");
        }

        const data = await response.json();
        const rate = data["usd-coin"]?.myr;

        if (rate && typeof rate === "number") {
          setUsdcToMyrRate(rate);
        } else {
          throw new Error("Invalid rate data");
        }
      } catch (error) {
        console.error("Error fetching USDC rate:", error);
        setRateError("Using fallback rate");
        // Keep using the default fallback rate
      } finally {
        setIsLoadingRate(false);
      }
    };

    fetchUSDCRate();
    // Refresh rate every 5 minutes
    const interval = setInterval(fetchUSDCRate, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Convert MYR to USDC
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
        alert("Please enter a transaction description");
        return;
      }

      // Convert MYR to USDC
      const usdcAmount = convertMYRtoUSDC(myrAmount);

      // USDC has 6 decimals
      const usdcValue = parseUnits(usdcAmount, 6);

      // Send USDC transaction
      // Replace with your actual USDC contract function
      const tx = await writeContractAsync({
        functionName: "setGreeting",
        args: [description],
        value: usdcValue,
      });

      // Redirect to confirmation page with transaction details
      const params = new URLSearchParams({
        recipientName: recipientName,
        amount: myrAmount,
        usdcAmount: usdcAmount,
        description: description,
        transactionHash: tx || "0x...",
      });

      router.push(`/PaymentSuccessful/confirm?${params.toString()}`);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const getSelectedAmountValue = () => {
    return isCustom ? customAmount : selectedAmount;
  };

  const getUSDCAmount = () => {
    const myrAmount = getSelectedAmountValue();
    return myrAmount ? convertMYRtoUSDC(myrAmount) : "";
  };

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5 w-full max-w-2xl">
        <h1 className="text-center mb-8">
          <span className="block text-4xl font-bold">USDC Payment</span>
          <span className="block text-sm mt-2 opacity-70">Pay in MYR, settled in USDC</span>
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
                <span className="label-text text-lg font-semibold">Select Amount (MYR):</span>
              </label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {presetAmounts.map(amount => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`btn ${selectedAmount === amount && !isCustom ? "btn-primary" : "btn-outline"}`}
                  >
                    RM {amount}
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
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    placeholder="Enter amount in MYR"
                    value={customAmount}
                    onChange={e => setCustomAmount(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>
              )}

              {/* Display selected amount */}
              {getSelectedAmountValue() && (
                <div className="alert alert-info mt-4">
                  <div className="flex flex-col w-full">
                    <span className="font-semibold">Amount: RM {getSelectedAmountValue()}</span>
                    <span className="text-sm">≈ {getUSDCAmount()} USDC</span>
                    <span className="text-xs opacity-70">Rate: 1 USDC = RM {usdcToMyrRate.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Live Exchange Rate Indicator */}
            <div className="alert mb-4 bg-base-200">
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold">Exchange Rate:</span>
                {isLoadingRate ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <span>
                    1 USDC = RM {usdcToMyrRate.toFixed(2)}
                    {rateError && <span className="text-xs text-warning ml-2">({rateError})</span>}
                    <span className="text-xs ml-2">🟢 Live</span>
                  </span>
                )}
              </div>
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
