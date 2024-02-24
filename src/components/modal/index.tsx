import { useEffect, useState } from 'react'

import './style.css'
import { Ruby } from '@/assets'
import * as service from '@/service'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { depositToken, getTokenBalance } from '@/utils/token'
import { PublicKey } from '@solana/web3.js'
import { DNA } from 'react-loader-spinner';
import { RBYAmount, RBYTokenAddr } from '@/data/constant'
import { useApp } from '@/context'

export const DepositModal = () => {
  const { fetchData,setDeposit, depositModalOpen, setDepositModalOpen,setStatus } = useApp();
  const wallet = useWallet();
  const { connection } = useConnection();

  const [error, setError] = useState<string | undefined>(undefined)
  const [paying, setPaying] = useState<boolean>(false)
  const [balance, setBalance] = useState<number | undefined>(0)

  const modalClose = async () => {
    setDepositModalOpen(false)
  }

  const handleDeposit = async () => {
    if (!wallet.publicKey) {
      console.log('Wallet is not connected, please connect wallet first')
      setError('Wallet is not connected, please connect wallet first')
      return
    }
    if (RBYAmount > Number(balance)) return
    try {
      setPaying(true)
      const {signature, tokenBalance} = await depositToken(wallet, connection, RBYAmount)!
      if (!signature) throw new Error('Tx failed')
      const res = await service.deposit({ address: wallet.publicKey.toString(), amount: RBYAmount, tx: signature })
      setPaying(false)
      setDeposit(true)
      setBalance(tokenBalance)
      setStatus('spin')
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
    const bal = await getTokenBalance(wallet, connection)
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
          <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70]  bg-[#ab9ff2] flex flex-col gap-[20px] justify-center items-center border-[#32209b] border-[5px] rounded-[30px] p-[20px] min-w-[400px]`}>
            <div className='flex items-center'>
              <span className='text-[50px] leading-[50px] text-[#ff0049] flex items-center'><div>{RBYAmount} </div> &nbsp;</span>

              <img src={Ruby} className='' />
              <span className='text-[50px]  leading-[50px] text-[#ff0049] flex items-center'><div>BY</div>  &nbsp;</span>
            </div>
            {wallet.publicKey ? <div>Your balance : {balance}</div> : <></>}
            {error ?
              <div className='flex justify-center text-center w-full animate-ready'>{error}</div> : <></>}
            {!error ? <div className='flex gap-[10px]'>
              <button className={RBYAmount && RBYAmount < Number(balance) ? `bg-gray-600 hover:bg-gray-800 text-white hover:text-[#feffdb] p-[10px] rounded-md` : `bg-gray-900  text-gray-500  p-[10px] rounded-md cursor-not-allowed`} onClick={handleDeposit} >Deposit</button>
              <button className='bg-red-800 hover:bg-red-600 text-white hover:text-[black] p-[10px] rounded-md' onClick={() => {
                modalClose()
              }}>Cancel</button>
            </div> : <></>}
          </div>
          <div className='absolute backdrop-blur-md w-[100vw] h-[100vh] z-[60]' onClick={() => modalClose()} />
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

export const ClaimModal = () => {
  const [claiming, setClaiming] = useState<boolean>(false)
  const {fetchData,setStatus, running, playing, setPlaying, claimable, setClaimable, process, setProcess, claimModalOpen, setClaimModalOpen, setDeposit } = useApp();
  const wallet = useWallet();

  const handleClaim = async () => {
    if (wallet.publicKey) {
      setClaiming(true)
      await service.claim({ address: wallet.publicKey.toString() })
      setClaimModalOpen(false)
      setClaiming(false)
      setPlaying(false)
      setClaimable(undefined)
      setProcess(false)
      setDeposit(false)
      fetchData(wallet.publicKey.toString())
      setStatus('desposit')
    }
  }

  return (
    <>
      {claimModalOpen ?
        <>
          <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70]  bg-[#ab9ff2] flex flex-col gap-[20px] justify-center items-center border-[#32209b] border-[5px] rounded-[30px] p-[20px] min-w-[530px]`}>
            <div className='flex items-center'>
              <span className='text-[50px] leading-[50px] text-[#ff0049] flex items-center'><div>Deposited : </div>  {playing}&nbsp;</span>
              <img src={Ruby} className='' />
              <span className='text-[50px]  leading-[50px] text-[#ff0049] flex items-center'><div>BY</div>  &nbsp;</span>
            </div>
            <div>Your prize : {claimable} sol</div>
            <div className='flex gap-[10px]'>

              {/* <button className={RBYAmount && RBYAmount < Number(balance) ? `bg-gray-600 hover:bg-gray-800 text-white hover:text-[#feffdb] p-[10px] rounded-md` : `bg-gray-900  text-gray-500  p-[10px] rounded-md cursor-not-allowed`} onClick={handleDeposit} >Deposit</button> */}

              <button className={!running && !process ? `bg-gray-600 hover:bg-gray-800 text-white hover:text-[#feffdb] p-[10px] rounded-md` : `bg-gray-900  text-gray-500  p-[10px] rounded-md cursor-not-allowed`} onClick={handleClaim} disabled={running || process}>Claim</button>
              <button className='bg-red-800 hover:bg-red-600 text-white hover:text-[black] p-[10px] rounded-md' onClick={() => {
                setClaimModalOpen(false)
              }}>Cancel</button>
            </div>
          </div>
          <div className='absolute backdrop-blur-md w-[100vw] h-[100vh] z-[60]' onClick={() => setClaimModalOpen(false)} />
          {claiming ?
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
        </> : <></>
      }
    </>
  )
}