const CurrencySelector = () => {
    return (
        <button className="flex items-center gap-2 rounded-full bg-teal-500 px-4 py-1.5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/30">
            <div className="h-6 w-6">
                <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="#2775CA" />
                    <text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                        $
                    </text>
                </svg>
            </div>

            <span className="text-lg font-semibold text-[#F4FAFF]">
                USDC / MYR
            </span>

            <svg className="ml-1 h-6 w-6" viewBox="0 0 24 24">
                <path d="M7 10L12 15L17 10" stroke="#F4FAFF" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </button>
    );
};

export default CurrencySelector;
