import { memo } from 'react'

import { Claim, Deposit } from '@/assets'

type Props = {
    handleDeposit: () => boolean,
    handleClaim: () => boolean
}

const Buttons = ({ handleDeposit, handleClaim }: Props) => {
    return (
        <div className='absolute flex items-center justify-center top-[10px] right-[50px]'>
            <img src={Deposit} className='w-[150px] h-[150px] cursor-pointer' onClick={() => handleDeposit} />
            <img src={Claim} className='w-[150px] h-[150px] cursor-pointer' onClick={() => handleClaim} />
        </div>
    )
}

export default memo(Buttons)
