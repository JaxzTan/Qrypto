const TransferIcon = () => {
  return (
    <svg width="47" height="47" viewBox="0 0 47 47" fill="none">
      <circle cx="23.5" cy="23.5" r="23.5" fill="#F4FAFF" />
      <path
        d="M23.5 14V33M23.5 14L16 21M23.5 14L31 21"
        stroke="url(#transferGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="transferGrad"
          x1="16"
          y1="14"
          x2="31"
          y2="33"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6EC7E1" />
          <stop offset="1" stopColor="#44AAC8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default TransferIcon;
