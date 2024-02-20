import { ReactElement } from 'react'

import './style.css'
import { Ruby } from '@/assets'
import { depositApi } from '@/service/walletService'

type Props = {
  children: ReactElement
  close?: () => void
  className?: string
}

type DepositProps = {
  depositAmount: number | undefined
  SetDepositAmount: React.Dispatch<React.SetStateAction<number | undefined>>
  depositModalOpen: boolean
  setDepositModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Modal = ({ children, close, className }: Props) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-[100vh] bg-black bg-opacity-50 z-10 transition ${className}`}>
      <div
        onClick={close}
        className='absolute top-3 right-3 bg-gray-400 rounded-full w-10 h-10 text-white flex justify-center items-center cursor-pointer'
      >
        X
      </div>
      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20'>{children}</div>
    </div>
  )
}

export const DepositModal = ({ depositAmount, SetDepositAmount, depositModalOpen, setDepositModalOpen }: DepositProps) => {

  const handleDeposit = async () => {
    const res = await depositApi({address:'asfd', amount:1234})
    console.log(res)
    return
  }

  return (
    <>
      {depositModalOpen ?
        <>
          <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50  bg-[#ab9ff2] flex flex-col gap-[20px] justify-center items-center border-[#32209b] border-[5px] rounded-[30px] p-[20px]`}>
            <div className='flex items-center'>
              <span className='text-[50px] leading-[50px] text-[#ff0049] '>Deposit &nbsp;</span>
              <img src={Ruby} className='' />
              <span className='text-[50px]  leading-[50px] text-[#ff0049]'>BY &nbsp;</span>
            </div>
            <input type="number" className='rounded-md w-[100%] text-[40px] h-[50px] p-[5px] border-[black] border-[1px] text-center' value={depositAmount} onChange={e => {
              SetDepositAmount(Number(e.target.value))
            }} />
            <div className='flex gap-[10px]'>
              <button className='bg-gray-600 hover:bg-gray-800 text-white hover:text-[#feffdb] p-[10px] rounded-md' onClick={handleDeposit}>Deposit</button>
              <button className='bg-red-800 hover:bg-red-600 text-white hover:text-[black] p-[10px] rounded-md' onClick={() => {
                setDepositModalOpen(false)
                SetDepositAmount(undefined)
              }}>Cancel</button>
            </div>
          </div>
          <div className='absolute backdrop-blur-md w-[100vw] h-[100vh] z-40'></div>
        </>
        : <></>}
    </>
  )
}
