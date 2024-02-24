import { RBYTokenAddr, fee, treasury, treasuryToken } from "@/data/constant";
import { createTransferInstruction, getAssociatedTokenAddress } from "@solana/spl-token"
import { WalletContextState } from "@solana/wallet-adapter-react"
import { Connection, PublicKey, Transaction, LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js";

const tresuryTokenAccount: PublicKey = new PublicKey(treasuryToken)
const tokenMint = new PublicKey(RBYTokenAddr)

export const depositToken = async (wallet: WalletContextState, connection: Connection, depositAmount: number) => {
    try {
        if (!wallet || !wallet.publicKey) {
            console.log("Wallet not connected")
            return{ signature: '', tokenBalance: 0 }
        }

        const sourceAccount = await getAssociatedTokenAddress(
            tokenMint,
            wallet.publicKey
        );

        const mintInfo = await connection.getParsedAccountInfo(tokenMint)
        if (!mintInfo.value) throw new Error("Token info error")

        // @ts-ignore
        const numberDecimals = mintInfo.value.data.parsed!.info.decimals;

        // create tx
        const tx = new Transaction();
        // send token
        tx.add(createTransferInstruction(
            sourceAccount,
            tresuryTokenAccount,
            wallet.publicKey,
            depositAmount * Math.pow(10, numberDecimals)
        ))
            // send sol
            .add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: new PublicKey(treasury),
                    lamports: fee * LAMPORTS_PER_SOL,
                })
            );

        // send and confirm
        const signature = await wallet.sendTransaction(tx, connection);
        await connection.confirmTransaction(signature, "confirmed");

        const log = `\x1b[32mTransaction Success!🎉\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`

        const tokenBalance = await getTokenBalance(wallet, connection);

        return { signature: signature, tokenBalance: tokenBalance }
    } catch (e) {
        console.warn(e)
        return  { signature: '', tokenBalance: 0 }
    }
}

export const getTokenBalance = async (wallet: WalletContextState, connection: Connection) => {
    if (!wallet.publicKey) {
        console.log("Wallet not connected")
        return undefined
    }
    const sourceAccount = await getAssociatedTokenAddress(
        tokenMint,
        wallet.publicKey
    );

    const info = await connection.getTokenAccountBalance(sourceAccount);
    if (!info.value.uiAmount) throw new Error('No balance found');

    return info.value.uiAmount;
}
