import { memo } from 'react'

import { Claim, Deposit } from '@/assets'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

type Props = {
    handleDeposit: () => boolean,
    handleClaim: () => boolean
}

const Buttons = ({ handleDeposit, handleClaim }: Props) => {
    return (
        <div className='absolute flex items-center justify-center top-[10px] right-[50px] z-[10]'>
            <img src={Deposit} className='w-[150px] h-[150px] cursor-pointer' onClick={() => handleDeposit} />
            <img src={Claim} className='w-[150px] h-[150px] cursor-pointer' onClick={() => handleClaim} />
            < WalletMultiButton />
        </div>
    )
}

export default memo(Buttons)
