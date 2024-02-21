import { memo } from 'react'

import { Claim, Deposit } from '@/assets'

type Props = {
    handleDeposit: React.Dispatch<React.SetStateAction<boolean>>,
}

const Buttons = ({ handleDeposit }: Props) => {
    return (
        <>
            <div className={`absolute flex items-center justify-center gap-[10vh] right-[calc(50vw_+_25vh_+_30px)] z-[10] h-[100vh] `}>
                <img src={Deposit} className='cursor-pointer h-[50%]' onClick={() => {
                    handleDeposit(true)
                }} />
            </div>
            <div className={`absolute flex items-center justify-center gap-[10vh] left-[calc(50vw_+_25vh_+_30px)] z-[10] h-[100vh] `}>
                <img src={Claim} className='cursor-pointer  h-[50%]' onClick={() => {}} />
            </div>
        </>
    )
}

export default memo(Buttons)
