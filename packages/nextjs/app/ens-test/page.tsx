"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useEnsProfile } from "~~/hooks/useEnsProfile";
import { isAddress } from "viem";

const EnsTestPage: NextPage = () => {
  const [testInput, setTestInput] = useState("");
  const [testResults, setTestResults] = useState<Array<{
    input: string;
    address?: string;
    name?: string;
    avatar?: string | null;
    isLoading: boolean;
    timestamp: string;
  }>>([]);

  return (
    <div className="flex flex-col min-h-screen p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">ENS Sepolia Testnet Verification</h1>

      <div className="card bg-base-200 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">Test ENS Resolution</h2>
          <p className="text-sm opacity-70 mb-4">
            Enter an ENS name (e.g., vitalik.eth) or Ethereum address to test resolution on Sepolia testnet
          </p>

          <TestInput
            value={testInput}
            onChange={setTestInput}
            onTest={(result) => {
              setTestResults(prev => [result, ...prev]);
              setTestInput("");
            }}
          />
        </div>
      </div>

      {/* Quick Test Buttons */}
      <div className="card bg-base-200 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">Quick Tests</h2>
          <div className="flex flex-wrap gap-2">
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setTestInput("vitalik.eth")}
            >
              Test vitalik.eth
            </button>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setTestInput("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045")}
            >
              Test Address
            </button>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setTestInput("nick.eth")}
            >
              Test nick.eth
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Test Results</h2>
            {testResults.length > 0 && (
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => setTestResults([])}
              >
                Clear All
              </button>
            )}
          </div>

          {testResults.length === 0 ? (
            <p className="text-center opacity-50 py-8">No test results yet. Run a test above!</p>
          ) : (
            <div className="space-y-4">
              {testResults.map((result, idx) => (
                <TestResult key={idx} result={result} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="alert alert-info mt-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <h3 className="font-bold">Testing on Sepolia Testnet</h3>
          <div className="text-sm">
            <p>• ENS names must be registered on Sepolia testnet (separate from mainnet)</p>
            <p>• Resolution is free (read-only operations)</p>
            <p>• ChainId: 11155111 (Sepolia)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Test Input Component
function TestInput({
  value,
  onChange,
  onTest
}: {
  value: string;
  onChange: (val: string) => void;
  onTest: (result: any) => void;
}) {
  const { address, name, avatar, isLoading } = useEnsProfile(value);

  const handleTest = () => {
    if (!value.trim()) return;

    onTest({
      input: value,
      address,
      name,
      avatar,
      isLoading,
      timestamp: new Date().toLocaleTimeString(),
    });
  };

  return (
    <div className="space-y-4">
      <div className="join w-full">
        <input
          type="text"
          placeholder="Enter ENS name or address..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input input-bordered join-item flex-1"
          onKeyDown={(e) => e.key === "Enter" && handleTest()}
        />
        <button
          className="btn join-item btn-primary"
          onClick={handleTest}
          disabled={!value.trim()}
        >
          Test
        </button>
      </div>

      {/* Live Preview */}
      {value.trim() && (
        <div className="p-4 bg-base-300 rounded-lg">
          <p className="text-xs font-bold opacity-50 mb-2">LIVE PREVIEW</p>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              <span className="text-sm">Resolving on Sepolia...</span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-xs font-bold opacity-50 w-20">Input:</span>
                <span className="text-sm font-mono">{value}</span>
              </div>
              {address && (
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold opacity-50 w-20">Address:</span>
                  <span className="text-sm font-mono text-success">{address}</span>
                </div>
              )}
              {name && (
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold opacity-50 w-20">ENS Name:</span>
                  <span className="text-sm font-mono text-success">{name}</span>
                </div>
              )}
              {avatar && (
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold opacity-50 w-20">Avatar:</span>
                  <img src={avatar} alt="ENS Avatar" className="w-10 h-10 rounded-full" />
                </div>
              )}
              {!address && !isLoading && (
                <div className="text-sm text-error">❌ No resolution found on Sepolia</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Test Result Component
function TestResult({ result }: { result: any }) {
  const inputType = isAddress(result.input) ? "Address" : "ENS Name";
  const hasResolution = result.address || result.name;

  return (
    <div className={`p-4 rounded-lg border-2 ${hasResolution ? "border-success bg-success/10" : "border-error bg-error/10"}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="badge badge-sm badge-ghost">{inputType}</span>
          <span className="badge badge-sm badge-ghost ml-2">{result.timestamp}</span>
        </div>
        <div className={`badge ${hasResolution ? "badge-success" : "badge-error"}`}>
          {hasResolution ? "✓ Success" : "✗ Failed"}
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <p className="text-xs font-bold opacity-50">Input</p>
          <p className="text-sm font-mono">{result.input}</p>
        </div>

        {result.address && (
          <div>
            <p className="text-xs font-bold opacity-50">Resolved Address</p>
            <p className="text-sm font-mono text-success">{result.address}</p>
          </div>
        )}

        {result.name && (
          <div>
            <p className="text-xs font-bold opacity-50">Resolved ENS Name</p>
            <p className="text-sm font-mono text-success">{result.name}</p>
          </div>
        )}

        {result.avatar && (
          <div>
            <p className="text-xs font-bold opacity-50 mb-1">Avatar</p>
            <img src={result.avatar} alt="ENS Avatar" className="w-12 h-12 rounded-full" />
          </div>
        )}

        {!hasResolution && !result.isLoading && (
          <div className="alert alert-error py-2">
            <span className="text-xs">
              No ENS record found on Sepolia testnet. Make sure the ENS name is registered on Sepolia.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default EnsTestPage;
