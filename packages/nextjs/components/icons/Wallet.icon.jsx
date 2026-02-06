const WalletIcon = () => {
  return (
    <svg width="47" height="47" viewBox="0 0 47 47" fill="none">
      <circle cx="23.5" cy="23.5" r="23.5" fill="#F4FAFF" />
      <rect
        x="10"
        y="15"
        width="27"
        height="17"
        rx="3"
        stroke="url(#walletGrad)"
        strokeWidth="2.5"
      />
      <circle cx="31" cy="23.5" r="2.5" fill="url(#walletGrad)" />
      <path
        d="M10 20H17C18.1046 20 19 19.1046 19 18V15"
        stroke="url(#walletGrad)"
        strokeWidth="2.5"
      />
      <defs>
        <linearGradient
          id="walletGrad"
          x1="10"
          y1="15"
          x2="37"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6EC7E1" />
          <stop offset="1" stopColor="#44AAC8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default WalletIcon;
