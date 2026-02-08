"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { NextPage } from "next";

const PaymentSuccessfulPage: NextPage = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "0";
  const usdc = searchParams.get("usdc") || "0";
  const recipient = searchParams.get("recipient") || "Unknown";

  return (
    <div className="flex items-center justify-center flex-col flex-grow pt-10 w-full overflow-hidden px-4">
      <div className="w-full max-w-md overflow-hidden">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center overflow-hidden">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold">Payment Successful!</h1>
            <p className="text-base-content/70">Your transaction has been confirmed</p>

            {/* Payment Details */}
            <div className="w-full bg-base-200 rounded-lg p-4 mt-4 overflow-hidden">
              <div className="flex justify-between mb-2">
                <span className="text-base-content/70">Recipient</span>
                <span className="font-semibold truncate ml-2">{recipient}</span>
              </div>
              <div className="divider my-1"></div>
              <div className="flex justify-between mb-2">
                <span className="text-base-content/70">Amount (MYR)</span>
                <span className="font-semibold">RM {amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Amount (USDC)</span>
                <span className="font-semibold">{usdc} USDC</span>
              </div>
            </div>

            {/* Actions */}
            <div className="card-actions w-full mt-6 flex flex-col gap-3">
              <Link href="/payment" className="btn btn-primary w-full">
                Make Another Payment
              </Link>
              <Link href="/" className="btn btn-outline w-full">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessfulPage;
