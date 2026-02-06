const PayIcon = () => {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
      <circle cx="23" cy="23" r="23" fill="#F4FAFF" />
      <rect
        x="12"
        y="16"
        width="22"
        height="14"
        rx="2"
        stroke="url(#payGrad)"
        strokeWidth="2.5"
      />
      <path
        d="M12 22H34"
        stroke="url(#payGrad)"
        strokeWidth="2.5"
      />
      <defs>
        <linearGradient
          id="payGrad"
          x1="12"
          y1="16"
          x2="34"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6EC7E1" />
          <stop offset="1" stopColor="#44AAC8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PayIcon;
