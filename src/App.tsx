import React, { useState } from 'react'
// import React, { useEffect, useState } from 'react'
import './App.css'
import { Banner, Buttons, SpinWheel } from '@/components'
import { Data } from '@/data/constant'
import Markpanel from './components/markpanel'

const App: React.FC = () => {
  const [running, setRunning] = useState<boolean>(false)
  const [angle, setAngle] = useState<number | undefined>(10000)
  const [multi, setMulti] = useState<number>(1)

  const handleDeposit = (): boolean => {
    return true
  }

  const handleClaim = (): boolean => {
    return true
  }

  return (
    <div className='relative flex flex-col justify-center items-center bg-[url("./src/assets/background.png")] bg-cover bg-bottom overflow-hidden'>
      <Banner />
      <Buttons handleDeposit={handleDeposit} handleClaim={handleClaim} />
      <SpinWheel data={Data} running={running} setRunning={setRunning} angle={angle} setAngle={setAngle} />
      <Markpanel multi={multi} setMulti={setMulti} />
    </div>
  )
}

export default App
