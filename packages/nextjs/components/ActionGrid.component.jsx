import Link from "next/link";
import ActionCard from "./ActionCard.component";
import TransferIcon from "./icons/Transfer.icon";
import ReceiveIcon from "./icons/Receive.icon";
import PayIcon from "./icons/Pay.icon";
import WalletIcon from "./icons/Wallet.icon";

const ActionGrid = () => {
  return (
    <section className="grid grid-cols-2 gap-6 px-10 py-10">
      <ActionCard label="Transfer" icon={<TransferIcon />} />
      <ActionCard label="Receive" icon={<ReceiveIcon />} />
      <Link href="/PaymentSuccessful">
        <ActionCard label="Pay" icon={<PayIcon />} />
      </Link>
      <ActionCard label="Wallet" icon={<WalletIcon />} />
    </section>
  );
};

export default ActionGrid;
