import { Arrow, Spin, Symbol } from '@/assets'
import * as service from '@/service'
import { useWallet } from '@solana/wallet-adapter-react'
import { SetStateAction, memo, useEffect, useState } from 'react'

type Props = {
  data: any[],
  running: boolean,
  setRunning: React.Dispatch<React.SetStateAction<boolean>>,
  angle: number | undefined
  setAngle: React.Dispatch<SetStateAction<number | undefined>>,
  lockAmount: number | undefined
}

const SpinWheel = ({ data, running, setRunning, angle, setAngle, lockAmount }: Props) => {
  const [rotating, setRotating] = useState<number>(0)
  const [step, setStep] = useState<number>(1)
  const wallet = useWallet();
  // const [showModal, SetShowModal] = useState<boolean>(false)
  const addingStep = 0.04
  const decreaseRate = 0.993
  const initialDistance = 4000
  const lastDistance = 2550

  // Start spin wheel
  const startRotate = async () => {
    if (wallet.publicKey) {
      const res = await service.play({ address: wallet.publicKey?.toString(), prize: data })
      setAngle(res.data.angle)
      if (angle && lockAmount) {
        setRunning(true)
      }
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

  useEffect(() => {
    setRunning(false)
     // 12960 ~ 13320 
  }, [])

  // Rotating effect
  useEffect(() => {
    if (running) {
      setTimeout(() => {
        if (angle && rotating + step > angle) {
          setRotating(angle)
          setRunning(false)
          setAngle(undefined)
          setStep(1)
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
          return <span className={`absolute text-[3vh] w-[100px] text-center h-[calc(35%)] text-white z-50`} style={numberStyle}>{value.name}</span>
        })}
      </div>
      <img src={Symbol} className={`absolute w-[30%] ${running && lockAmount ? 'animate-play ' : !running && lockAmount ? 'animate-ready cursor-pointer' : ''}  rounded-[50%] z-50`} onClick={() => startRotate()} />
      {running ? <div className='absolute backdrop-blur-md w-[100vw] h-[100vh] z-30 ' /> : <></>}
      <img src={Arrow} className={`absolute h-[24%] top-[10%] z-50`} />
      {/* <img src={Arrow} className='absolute h-[10%] top-[23%]'/> */}
    </div>
  )
}

export default memo(SpinWheel)
