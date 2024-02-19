import { FC } from "react";
// import styles from "../styles/Home.module.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const WalletButton: FC = () => {
    return (
        <div className='' >
            < WalletMultiButton />
        </div>
    );
};

export default WalletButton