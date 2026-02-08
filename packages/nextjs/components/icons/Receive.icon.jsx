const ReceiveIcon = () => {
  return (
    <svg width="61" height="61" viewBox="0 0 61 61" fill="none">
      <circle cx="30.5" cy="30.5" r="30.5" fill="#F4FAFF" />
      <path
        d="M30.5 18V43M30.5 43L21 33.5M30.5 43L40 33.5"
        stroke="url(#receiveGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="receiveGrad"
          x1="21"
          y1="18"
          x2="40"
          y2="43"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6EC7E1" />
          <stop offset="1" stopColor="#44AAC8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ReceiveIcon;
