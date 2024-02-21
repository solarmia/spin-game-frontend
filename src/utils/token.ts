import { createTransferInstruction, getAssociatedTokenAddress } from "@solana/spl-token"
import { WalletContextState } from "@solana/wallet-adapter-react"
import { Connection, PublicKey, Keypair, Transaction, clusterApiUrl, LAMPORTS_PER_SOL, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";
import bs58 from 'bs58';

const tresuryTokenAccount: PublicKey = new PublicKey("CMmBpzD7e5oC3RTAE1b2wQkNLby24bats5DRFRbJbsDU")

export const depositToken = async (wallet: WalletContextState, connection: Connection, depositAmount: number, tokenMint: PublicKey) => {
    if (!wallet || !wallet.publicKey) {
        console.log("Wallet not connected")
        return
    }
    // Step 1 - Getting Source Token Account
    const sourceAccount = await getAssociatedTokenAddress(
        tokenMint,
        wallet.publicKey
    );

    // step 2 - Get token info
    // all the token data is here
    // const tokenBalance = await getTokenBalance(wallet, connection, tokenMint);
    // const mint = await connection.getParsedAccountInfo(tokenMint)
    
    const mintInfo = await connection.getParsedAccountInfo(tokenMint)
    if (!mintInfo.value) throw new Error("Token info error")
    // @ts-ignore
    const numberDecimals = mintInfo.value.data.parsed!.info.decimals;

    //Step 4 - Creating and Sending Transaction
    const tx = new Transaction();
    tx.add(createTransferInstruction(
        sourceAccount,
        tresuryTokenAccount,
        wallet.publicKey,
        depositAmount * Math.pow(10, numberDecimals)
    ))
    const signature = await wallet.sendTransaction(tx, connection);
    await connection.confirmTransaction(signature, "confirmed");

    const log = `\x1b[32mTransaction Success!🎉\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`

    console.log(log);
    // const tokenBalance = await getTokenBalance(wallet, connection, tokenMint);

    return signature
}

export const getTokenBalance = async (wallet: WalletContextState, connection: Connection, tokenMint: PublicKey) => {
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

export const sendSolToUser = async (amount: number, userWallet: string) => {

    const treasuryKeypair = Keypair.fromSecretKey(
        // bs58.decode(process.env.TREASURY_PRIVATE_KEY)
        bs58.decode("4RuaqLoan9Cjd7yGj9kvoD6RagVfxi1zEj5PMCFey6TkF51HcfozpSzRvLKKpGYq8WzCyBPEM76v6mJyW9ZWAb1k")
    )
    // Connect to cluster
    const connection = new Connection(clusterApiUrl("devnet"));
    // Construct a `Keypair` from secret key

    // Generate a new random public key

    // Add transfer instruction to transaction
    const userWalletPK = new PublicKey(userWallet);
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: treasuryKeypair.publicKey,
            toPubkey: userWalletPK,
            lamports: amount * LAMPORTS_PER_SOL,
        })
    );
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.feePayer = treasuryKeypair.publicKey
    // Sign transaction, broadcast, and confirm
    const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [treasuryKeypair]
    );
    console.log("SIGNATURE_success", signature);
}