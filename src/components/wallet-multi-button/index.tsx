import { FC } from "react";
// import styles from "../styles/Home.module.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const WalletButton: FC = () => {
    return (
        <div className="bg-[red]" >
            < WalletMultiButton className=""/>
        </div>
    );
};

export default WalletButton