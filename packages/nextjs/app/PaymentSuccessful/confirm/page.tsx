"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { NextPage } from "next";

const PaymentSuccessPage: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const recipientName = searchParams.get("recipientName") || "Jaxz Tan";
  const amount = searchParams.get("amount") || "0";
  const usdcAmount = searchParams.get("usdcAmount") || "0";
  const description = searchParams.get("description") || "Payment completed";
  const transactionHash = searchParams.get("transactionHash") || "0x...";

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5 w-full max-w-3xl">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body">
            {/* Success Animation Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* Outer pulse ring */}
                <div className="absolute inset-0 bg-success rounded-full animate-ping opacity-20"></div>
                {/* Success circle */}
                <div className="relative bg-success rounded-full p-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-white animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-success to-primary bg-clip-text text-transparent mb-3">
                Payment Successful!
              </h1>
              <p className="text-xl opacity-70">Your transaction has been completed successfully.</p>
            </div>

            {/* Transaction Summary Card */}
            <div className="bg-gradient-to-br from-base-200 to-base-300 p-8 rounded-2xl mb-6 shadow-inner">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Transaction Details
              </h2>

              <div className="space-y-5">
                {/* Recipient */}
                <div className="flex flex-col gap-2 p-4 bg-base-100 rounded-xl">
                  <div className="flex items-center gap-2 opacity-70 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Paid To
                  </div>
                  <span className="text-xl font-bold ml-6">{recipientName}</span>
                </div>

                {/* Amount in MYR */}
                <div className="flex flex-col gap-2 p-4 bg-base-100 rounded-xl">
                  <div className="flex items-center gap-2 opacity-70 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Amount (MYR)
                  </div>
                  <span className="text-3xl font-bold ml-6 text-success">RM {amount}</span>
                </div>

                {/* Amount in USDC */}
                <div className="flex flex-col gap-2 p-4 bg-base-100 rounded-xl">
                  <div className="flex items-center gap-2 opacity-70 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Amount (USDC)
                  </div>
                  <span className="text-xl font-bold ml-6 text-primary">{usdcAmount} USDC</span>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2 p-4 bg-base-100 rounded-xl">
                  <div className="flex items-center gap-2 opacity-70 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                    Description
                  </div>
                  <span className="text-base ml-6 break-words">{description}</span>
                </div>

                {/* Transaction Hash */}
                <div className="flex flex-col gap-2 p-4 bg-base-100 rounded-xl">
                  <div className="flex items-center gap-2 opacity-70 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                      />
                    </svg>
                    Transaction Hash
                  </div>
                  <span className="text-xs ml-6 font-mono break-all opacity-70">{transactionHash}</span>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex justify-center mb-6">
              <div className="badge badge-success badge-lg gap-2 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Confirmed on Blockchain
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button onClick={() => router.push("/")} className="btn btn-primary btn-lg flex-1 gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Back to Home
              </button>
              <button onClick={() => router.push("/PaymentSuccessful")} className="btn btn-outline btn-lg flex-1 gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Payment
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6 opacity-70 text-sm">
          <p>A receipt has been sent to your connected wallet.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
