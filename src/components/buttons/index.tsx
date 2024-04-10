import { memo, useEffect } from 'react'

import { Claim, Deposit } from '@/assets'
import { useWallet } from '@solana/wallet-adapter-react'
import { useApp } from '@/context'

const Buttons = () => {
    const { status, playing, process, setDepositModalOpen, setClaimModalOpen } = useApp();
    const wallet = useWallet();
    useEffect(() => {
    })
    return (
        <>
            {wallet.publicKey ? <>
                {status == 'deposit' ? <div className={`absolute flex items-center justify-center gap-[10vh] right-[calc(50vw_+_25vh_+_30px)] z-[10] h-[100vh] `}>
                    <img src={Deposit} className='cursor-pointer h-[50%]' onClick={() => {
                        setDepositModalOpen(true)
                    }} />
                </div> : <></>}
                {!process && playing && status == 'claim' ? <div className={`absolute flex items-center justify-center gap-[10vh] left-[calc(50vw_+_25vh_+_30px)] z-[10] h-[100vh] `}>
                    <img src={Claim} className='cursor-pointer  h-[50%]' onClick={() => {
                        setClaimModalOpen(true)
                    }} />
                </div> : <></>}
            </> : <></>}
        </>
    )
}

export default memo(Buttons)
