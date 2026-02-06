const ActionCard = ({ label, icon }) => {
  return (
    <div className="aspect-square rounded-[36px] bg-[#F4FAFF] transition hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-200/40">
      <button className="flex h-full w-full flex-col items-center justify-center gap-2">
        <div className="transition hover:scale-110">
          {icon}
        </div>

        <span className="bg-gradient-to-r from-[#6EC7E1] to-[#44AAC8] bg-clip-text text-sm text-transparent">
          {label}
        </span>
      </button>
    </div>
  );
};

export default ActionCard;
