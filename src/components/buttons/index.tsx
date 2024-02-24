import { memo, useEffect } from 'react'

import { Claim, Deposit } from '@/assets'
import { useWallet } from '@solana/wallet-adapter-react'
import { useApp } from '@/context'

const Buttons = () => {
    const {status,  deposit, playing, process, setDepositModalOpen, setClaimModalOpen } = useApp();
    const wallet = useWallet();
    useEffect(() => {
        console.log('deposti btn', !deposit, !playing, !process)
    })
    return (
        <>
            {wallet.publicKey ? <>
                {status == 'deposit' ? <div className={`absolute flex items-center justify-center gap-[10vh] right-[calc(50vw_+_25vh_+_30px)] z-[10] h-[100vh] `}>
                    <img src={Deposit} className='cursor-pointer h-[50%]' onClick={() => {
                        setDepositModalOpen(true)
                    }} />
                </div> : <></>}
                {!process && playing ? <div className={`absolute flex items-center justify-center gap-[10vh] left-[calc(50vw_+_25vh_+_30px)] z-[10] h-[100vh] `}>
                    <img src={Claim} className='cursor-pointer  h-[50%]' onClick={() => {
                        setClaimModalOpen(true)
                    }} />
                </div> : <></>}
            </> : <></>}
        </>
    )
}

export default memo(Buttons)
