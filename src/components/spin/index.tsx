import { Arrow, Spin, Symbol } from '@/assets'
import { addingStep, decreaseRate, initialDistance, lastDistance } from '@/data/constant'
import * as service from '@/service'
import { useWallet } from '@solana/wallet-adapter-react'
import { SetStateAction, memo, useEffect, useState } from 'react'

type Props = {
  data: any[],
  running: boolean,
  setRunning: React.Dispatch<React.SetStateAction<boolean>>
  angle: number | undefined
  setAngle: React.Dispatch<SetStateAction<number | undefined>>
  deposit: boolean
  setProcess: React.Dispatch<React.SetStateAction<boolean>>
  setClaimModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SpinWheel = ({ data, running, setRunning, angle, setAngle, deposit, setProcess,setClaimModalOpen }: Props) => {
  const [rotating, setRotating] = useState<number>(0)
  const [step, setStep] = useState<number>(1)
  const wallet = useWallet();

  // Start spin wheel
  const startRotate = async () => {
    if (wallet.publicKey && deposit) {
      const res = await service.play({ address: wallet.publicKey?.toString(), prize: data })
      setAngle(res.data.angle)
      console.log('res.data.angle', res.data.angle)
      setRunning(true)
      // if (res.data.angle && deposit) {
      // }
    }
  }

  // Calculate result
  // const calc = () => {
  //   console.log(value)
  //   const rest = (Number(value) + 22.5) % 360
  //   const num = Math.floor(rest / 45)
  //   setRotating(0)
  //   return num < 0 ? 0 : num
  // }

  // useEffect(() => {
  //   setRunning(false)
  //   // 12960 ~ 13320 
  // }, [])

  // Rotating effect
  useEffect(() => {
    if (running) {
      setTimeout(() => {
        if (angle && rotating + step > angle) {
          setRotating(angle)
          setRunning(false)
          setAngle(undefined)
          setStep(1)
          setClaimModalOpen(true)
          // setProcess(false)
        } else {
          setRotating(rotating + step)
          if (rotating < initialDistance) setStep(step + addingStep)
          if (rotating > Number(angle) - lastDistance) {
            setStep(step * decreaseRate)
          }
        }
      }, 10)
    } else {
      // if (rotating > 0) alert(calc())
    }
  }, [rotating, running])

  return (
    <div className='relative flex items-center justify-center'>
      <div className={`h-[100vh] justify-center items-center flex relative z-40`} style={{ rotate: `${rotating}deg` }}>
        <img src={Spin} className='h-[50%] ' />
        {data.map((value, index) => {
          const numberStyle = {
            transform: `rotate(${index * (-45)}deg)`
          };
          return (
            <div key={index} className='absolute h-[calc(40%)] flex flex-row'>
              <span className={` text-[3vh]  text-center text-white z-50  `} style={numberStyle}>{value.name}<img src={value.img} alt="" className='h-[6vh]' /></span>
            </div>
          )
        }
        )}
      </div>
      <img src={Symbol} className={`absolute w-[30%] ${running && deposit ? 'animate-play ' : !running && deposit ? 'animate-ready cursor-pointer' : ''}  rounded-[50%] z-50`} onClick={() => startRotate()} />
      {running ? <div className='absolute backdrop-blur-md w-[100vw] h-[100vh] z-30 ' /> : <></>}
      <img src={Arrow} className={`absolute h-[24%] top-[7%] z-50`} />
      {/* <img src={Arrow} className='absolute h-[10%] top-[23%]'/> */}
    </div>
  )
}

export default memo(SpinWheel)
