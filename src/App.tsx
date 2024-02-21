import React, { useState } from 'react'
// import React, { useEffect, useState } from 'react'
import './App.css'
import { Banner, Buttons, SpinWheel, MarkPanel, WalletContextProvider, DepositModal } from '@/components'

import { Data } from '@/data/constant'
import { Background } from '@/assets'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const App: React.FC = () => {
  const [running, setRunning] = useState<boolean>(false)
  const [angle, setAngle] = useState<number | undefined>(20000)
  const [depositAmount, SetDepositAmount] = useState<number>(0)
  const [lockAmount, setLockAmount] = useState<undefined | number>(undefined)
  const [depositModalOpen, setDepositModalOpen] = useState<boolean>(false)

  // const handleDeposit = (): boolean => {
  //   console.log('model oepn')
  //   setDepositModalOpen(true)
  //   return true
  // }

  // const handleClaim = (): boolean => {
  //   return true
  // }

  return (
    <WalletContextProvider>
      <div className={`relative  bg-cover bg-bottom overflow-hidden`} style={{ backgroundImage: `url(${Background})` }}>
        <DepositModal
          depositAmount={depositAmount}
          SetDepositAmount={SetDepositAmount}
          depositModalOpen={depositModalOpen}
          setDepositModalOpen={setDepositModalOpen}
          lockAmount={lockAmount}
          setLockAmount={setLockAmount}
        />
        <div className='absolute right-[30px] top-[20px] bg-[#00000088] rounded-[4px] z-20'>
          <WalletMultiButton className='' />
        </div>
        <div className='flex flex-col justify-center items-center'>
          <Banner />
          <Buttons handleDeposit={setDepositModalOpen} />
          <SpinWheel
            data={Data} running={running}
            setRunning={setRunning}
            angle={angle}
            setAngle={setAngle}
            lockAmount={lockAmount}
          />
          <MarkPanel lockAmount={lockAmount} />
        </div>
      </div>

    </WalletContextProvider>
  )
}

export default App
