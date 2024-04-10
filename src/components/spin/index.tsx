import { Arrow, Spin, Symbol } from '@/assets'
import { useApp } from '@/context'
import { addingStep, decreaseRate, initialDistance, lastDistance } from '@/data/constant'
import * as service from '@/service'
import { useWallet } from '@solana/wallet-adapter-react'
import { memo, useEffect, useState } from 'react'
import { Data } from '@/data/constant'
import { Hourglass } from 'react-loader-spinner';


const SpinWheel = () => {
  const [rotating, setRotating] = useState<number>(0)
  const [step, setStep] = useState<number>(1)

  const { setPlaying, setStatus, setDeposit, status, setProcess, ready, setReady, running, setRunning, angle, setAngle, deposit, setClaimModalOpen, setClaimable } = useApp();
  const wallet = useWallet();

  // Start spin wheel
  const startRotate = async () => {
    if (wallet.publicKey && deposit) {
      try {
        setReady(true)
        const res = await service.play({ address: wallet.publicKey?.toString(), prize: Data() })
        setReady(false)
        setDeposit(false)
        setAngle(res.data.angle)
        setClaimable(res.data.reward)
        setRunning(true)
      } catch (e) {
        setReady(false)
      }
    }
  }

  const finishGame = async (angle: number) => {
    if (!wallet.publicKey) return
    try {
      await service.finish({ address: wallet.publicKey.toString() })
      setTimeout(() => {
        setProcess(false)
        setStatus('claim')
        setPlaying(true)
        setClaimModalOpen(true)
        setRotating(angle)
        setRunning(false)
        setAngle(undefined)
        setStep(1)
        setProcess(false)
        setRotating(0)
      }, 500)
    } catch (e) {

    }
  }

  // Rotating effect
  useEffect(() => {
    if (running) {
      setTimeout(() => {
        if (angle && rotating + step > angle) {
          finishGame(angle)
        } else {
          setRotating(rotating + step)
          if (rotating < initialDistance) setStep(step + addingStep)
          if (rotating > Number(angle) - lastDistance) {
            setStep(step * decreaseRate)
          }
        }
      }, 10)
    } else {
    }
  }, [rotating, running])

  return (
    <div className='relative flex items-center justify-center'>
      <div className={`h-[100vh] justify-center items-center flex relative z-40`} style={{ rotate: `${rotating}deg` }}>
        <img src={Spin} className={running ? `h-[80%] ` : `h-[50%] `} />
        {Data().map((value, index) => {
          const numberStyle = {
            transform: `rotate(${index * (-45)}deg)`
          };
          return (
            <div key={index} className={running ? 'absolute h-[calc(60%)] flex flex-row' : 'absolute h-[calc(40%)] flex flex-row'}>
              <span className={` text-[3vh]  text-center text-white z-50  `} style={numberStyle}><img src={value.img} alt="" className='h-[6vh]' />{value.name}</span>
            </div>
          )
        }
        )}
      </div>
      <img src={Symbol} className={`absolute w-[30%] ${running && !deposit ? 'animate-play ' : status == 'spin' && deposit ? 'animate-ready cursor-pointer' : ''}  rounded-[50%] z-50`} onClick={() => startRotate()} />
      {running ? <div className='absolute backdrop-blur-md w-[100vw] h-[100vh] z-30 ' /> : <></>}
      <img src={Arrow} className={`absolute h-[24%] top-[7%] z-50`} />
      {ready ?
        <div className='absolute backdrop-blur-md w-[100vw] h-[100vh] z-[70] flex justify-center items-center' >
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
          />
        </div>
        :
        <></>}
    </div>
  )
}

export default memo(SpinWheel)
