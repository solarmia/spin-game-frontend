import { useEffect, useState } from 'react'

import './style.css'
import { Ruby } from '@/assets'
import * as service from '@/service'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { depositToken, getTokenBalance } from '@/utils/token'
import { PublicKey } from '@solana/web3.js'
// import { depositFee } from '@/data/constant'
import { DNA } from 'react-loader-spinner';

type DepositProps = {
  depositAmount: number
  SetDepositAmount: React.Dispatch<React.SetStateAction<number>>
  depositModalOpen: boolean
  setDepositModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  lockAmount: number | undefined
  setLockAmount: React.Dispatch<React.SetStateAction<number | undefined>>
}

export const DepositModal = ({ depositAmount, SetDepositAmount, depositModalOpen, setDepositModalOpen, lockAmount,
  setLockAmount }: DepositProps) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [error, setError] = useState<string | undefined>(undefined)
  const [paying, setPaying] = useState<boolean>(false)
  const [balance, setBalance] = useState<number | undefined>(0)

  const modalClose = async () => {
    console.log(lockAmount)
    setDepositModalOpen(false)
    SetDepositAmount(0)
  }

  const handleDeposit = async () => {
    if (!wallet.publicKey) {
      console.log('Wallet is not connected, please connect wallet first')
      setError('Wallet is not connected, please connect wallet first')
      return
    }

    if (!depositAmount) return

    // const depositAmt = depositAmount * (100 + Number(depositFee)) / 100
    try {
      setPaying(true)
      const tx = await depositToken(wallet, connection, depositAmount, new PublicKey("8UY3iE44fALvKiYUA8WUEx3GK6EdhGj5ZzkhBMriGdmT"))
      if (!tx) return { error: 'Tx failed' }
      const res = await service.deposit({ address: wallet.publicKey.toString(), amount: depositAmount, tx: tx })
      setPaying(false)
      setLockAmount(res.data.amount)
      modalClose()
      return res.data.amount
    } catch (e) {
      console.log(e)
      setPaying(false)
      return { error: 'Error' }
    }
    // sendSolToUser(0.05, wallet.publicKey!.toString())
  }

  const getUserTokenBalance = async () => {
    const bal = await getTokenBalance(wallet, connection, new PublicKey("8UY3iE44fALvKiYUA8WUEx3GK6EdhGj5ZzkhBMriGdmT"))
    setBalance(bal)
  }

  useEffect(() => {
    if (!wallet.publicKey) {
      setError('Wallet is not connected, please connect wallet first!')
      setBalance(0)
    }
    else {
      getUserTokenBalance()
      setError(undefined)
    }
  }, [wallet.publicKey])

  return (
    <>
      {depositModalOpen ?
        <>
          <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70]  bg-[#ab9ff2] flex flex-col gap-[20px] justify-center items-center border-[#32209b] border-[5px] rounded-[30px] p-[20px] min-w-[350px]`}>
            <div className='flex items-center'>
              <span className='text-[50px] leading-[50px] text-[#ff0049] flex items-center'><div>Deposit</div>  &nbsp;</span>
              <img src={Ruby} className='' />
              <span className='text-[50px]  leading-[50px] text-[#ff0049] flex items-center'><div>BY</div>  &nbsp;</span>
            </div>
            {wallet.publicKey ? <div>Your balance : {balance}</div> : <></>}
            <input type="number" className='rounded-md w-[100%] text-[40px] h-[50px] p-[5px] border-[black] border-[1px] text-center' disabled={error ? true : false} value={depositAmount} onChange={e => {
              SetDepositAmount(Number(e.target.value))
            }} />
            {error ?
              <div className='flex justify-center text-center w-full animate-ready'>{error}</div> : <></>}
            {!error ? <div className='flex gap-[10px]'>
              <button className={depositAmount && depositAmount < Number(balance) ? `bg-gray-600 hover:bg-gray-800 text-white hover:text-[#feffdb] p-[10px] rounded-md` : `bg-gray-900  text-gray-500  p-[10px] rounded-md cursor-not-allowed`} onClick={handleDeposit} >Deposit</button>
              <button className='bg-red-800 hover:bg-red-600 text-white hover:text-[black] p-[10px] rounded-md' onClick={() => {
                modalClose()
              }}>Cancel</button>
            </div> : <></>}
          </div>
          <div className='absolute backdrop-blur-md w-[100vw] h-[100vh] z-[60]' onClick={() => setDepositModalOpen(false)} />
          {paying ?
            <div className='absolute backdrop-blur-md w-[100vw] h-[100vh] z-[70] flex justify-center items-center' >
              <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
            :
            <></>}
        </>

        : <></>}
    </>
  )
}
