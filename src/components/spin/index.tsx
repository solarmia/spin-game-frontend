import { Arrow, Spin, Symbol } from '@/assets'
import { SetStateAction, memo, useEffect, useState } from 'react'

type Props = {
  data: any[],
  running: boolean,
  setRunning: React.Dispatch<React.SetStateAction<boolean>>,
  angle: number | undefined
  setAngle: React.Dispatch<SetStateAction<number | undefined>>,
}

const SpinWheel = ({ data, running, setRunning, angle, setAngle }: Props) => {
  const [rotating, setRotating] = useState<number>(0)
  const [step, setStep] = useState<number>(1)
  // const [showModal, SetShowModal] = useState<boolean>(false)
  const addingStep = 0.04
  const decreaseRate = 0.993
  const initialDistance = 2880
  const lastDistance = 2170

  // Start spin wheel
  const startRotate = () => {
    if (angle) setRunning(true)
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
    setAngle(9720) // 9720 ~ 10080
  }, [])

  // Rotating effect
  useEffect(() => {
    if (running) {
      console.log('---', step)
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
    <div className='relative justify-center items-center flex'>
      <div className={`h-[100vh] justify-center items-center flex relative`} style={{ rotate: `${rotating}deg` }}>
        <img src={Spin} className='h-[50%]' />
        {data.map((value, index) => {
          const numberStyle = {
            transform: `rotate(${index * (-45)}deg)`
          };
          return <span className={`absolute text-[3vh] w-[100px] text-center h-[calc(35%)] text-white`} style={numberStyle}>{value.name}</span>
        })}
        {/* {running ? <span className='absolute'>running</span> : <span className='absolute' onClick={() => startRotate()}>not running</span>} */}
      </div>
      <img src={Symbol} className='absolute w-[30%]' onClick={() => startRotate()} />
      <img src={Arrow} className='absolute h-[24%] top-[10%]'/>
    </div>
  )
}

export default memo(SpinWheel)
