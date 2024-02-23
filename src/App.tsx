import React, { useEffect, useState } from 'react'
// import React, { useEffect, useState } from 'react'
import './App.css'
import { Banner, Buttons, SpinWheel, MarkPanel, WalletContextProvider, DepositModal, ClaimModal } from '@/components'

import { Data } from '@/data/constant'
import { Background } from '@/assets'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import * as service from '@/service'

const App: React.FC = () => {
  const [running, setRunning] = useState<boolean>(false)
  const [angle, setAngle] = useState<number | undefined>(20000)
  const [deposit, setDeposit] = useState<boolean>(false)
  const [playing, setPlaying] = useState<boolean>(false)
  const [claimable, setClaimable] = useState<undefined | number>(undefined)
  const [process, setProcess] = useState<boolean>(false)
  const [totalClaimed, setTotalClaimed] = useState<undefined | number>(undefined)
  const [totalDeposited, setTotalDeposited] = useState<undefined | number>(undefined)
  const [depositModalOpen, setDepositModalOpen] = useState<boolean>(false)
  const [claimModalOpen, setClaimModalOpen] = useState<boolean>(false)

  const wallet = useWallet();
  const { connection } = useConnection();

  const fetchData = async (address: string) => {
    const res = await service.fetch({ address: address })
    console.log(res)
    setDeposit(res.data.deposit)
    setPlaying(res.data.playing)
    setClaimable(res.data.claimable)
    setTotalDeposited(res.data.totalDeposit)
    setTotalClaimed(res.data.totalClaim)
    setProcess(res.data.process)
  }

  const initData = async () => {
    setDeposit(false)
    setPlaying(false)
    setClaimable(undefined)
    setTotalDeposited(undefined)
    setTotalClaimed(undefined)
    setProcess(false)
  }

  useEffect(() => {
    if (wallet && wallet.publicKey && connection) {
      fetchData(wallet.publicKey.toString())
    } else {
      initData()
    }
  }, [wallet.publicKey])

  return (
    <div className={`relative  bg-cover bg-bottom overflow-hidden`} style={{ backgroundImage: `url(${Background})` }}>
      <DepositModal
        depositModalOpen={depositModalOpen}
        setDepositModalOpen={setDepositModalOpen}
        setDeposit={setDeposit}
        wallet={wallet}
        connection={connection}
      />
      <ClaimModal
        playing={playing}
        setPlaying={setPlaying}
        claimable={claimable}
        setClaimable={setClaimable}
        process={process}
        setProcess={setProcess}
        claimModalOpen={claimModalOpen}
        setClaimModalOpen={setClaimModalOpen}
        wallet={wallet}
        connection={connection}
      />
      <div className='absolute right-[30px] top-[20px] bg-[#00000088] rounded-[4px] z-20'>
        <WalletMultiButton className=''/>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <Banner />
        <Buttons 
        setDepositModalOpen={setDepositModalOpen} 
        setClaimModalOpen={setClaimModalOpen}
        claimable={claimable}
        process={process}
        deposit={deposit}
        wallet={wallet}
        playing={playing}
        />
        <SpinWheel
          data={Data} running={running}
          setRunning={setRunning}
          angle={angle}
          setAngle={setAngle}
          deposit={deposit}
          setProcess={setProcess}
          setClaimModalOpen={setClaimModalOpen}
        />
        <MarkPanel
          deposit={deposit}
          wallet={wallet}
          playing={playing}
          claimable={claimable}
          process={process}
        />
      </div>
    </div>

  )
}

export default App
