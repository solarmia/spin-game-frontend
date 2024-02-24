import React, { useEffect, useState } from 'react'
// import React, { useEffect, useState } from 'react'
import './App.css'
import { Banner, Buttons, SpinWheel, MarkPanel, WalletContextProvider, DepositModal, ClaimModal } from '@/components'

import { Background } from '@/assets'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useApp } from '@/context'

const App: React.FC = () => {
  const { fetchData, initData } = useApp();

  const wallet = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    if (wallet && wallet.publicKey && connection) {
      console.log(connection)
      fetchData(wallet.publicKey.toString())
    } else {
      initData()
    }
  }, [wallet.publicKey])

  return (
    <div className={`relative  bg-cover bg-bottom overflow-hidden`} style={{ backgroundImage: `url(${Background})` }}>
      <DepositModal />
      <ClaimModal />
      <div className='absolute right-[30px] top-[20px] bg-[#00000088] rounded-[4px] z-20'>
        <WalletMultiButton />
      </div>
      <div className='flex flex-col justify-center items-center'>
        <Banner />
        <Buttons />
        <SpinWheel />
        <MarkPanel />
      </div>
    </div>

  )
}

export default App
