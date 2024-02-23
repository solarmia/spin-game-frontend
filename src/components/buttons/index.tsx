import { memo } from 'react'

import { Claim, Deposit } from '@/assets'
import { WalletContextState } from '@solana/wallet-adapter-react'

type Props = {
    setDepositModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setClaimModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    claimable: undefined | number
    process: boolean
    deposit: boolean
    wallet: WalletContextState
    playing: boolean
}

const Buttons = ({ setDepositModalOpen, setClaimModalOpen, claimable, process, deposit, wallet,playing }: Props) => {
    return (
        <>
            {wallet.publicKey ? <>
                {!deposit && !playing && !process? <div className={`absolute flex items-center justify-center gap-[10vh] right-[calc(50vw_+_25vh_+_30px)] z-[10] h-[100vh] `}>
                    <img src={Deposit} className='cursor-pointer h-[50%]' onClick={() => {
                        setDepositModalOpen(true)
                    }} />
                </div> : <></>}
                {!process && playing? <div className={`absolute flex items-center justify-center gap-[10vh] left-[calc(50vw_+_25vh_+_30px)] z-[10] h-[100vh] `}>
                    <img src={Claim} className='cursor-pointer  h-[50%]' onClick={() => {
                        setClaimModalOpen(true)
                    }} />
                </div> : <></>}
            </> : <></>}
        </>
    )
}

export default memo(Buttons)
