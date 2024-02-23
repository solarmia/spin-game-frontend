import { memo } from 'react'

import { MarkBoard, Fire, LetterSpin, LetterClaim, LetterDeposit } from '@/assets'
import { WalletContextState } from '@solana/wallet-adapter-react'

type Props = {
    deposit: boolean
    wallet: WalletContextState
    playing: boolean
    claimable: undefined | number
    process: boolean
}

const MarkPanel = ({ deposit, wallet, playing, claimable, process }: Props) => {
    console.log('mark modal', playing, claimable, process)
    return (
        <div className='absolute bottom-0 justify-center h-[25vh]'>
            <img src={MarkBoard} className='h-[100%]' />
            {/* {deposit ?
                <span className='absolute h-[40%] top-[5%] text-center w-[100%] text-[30px]'>{deposit}</span>
                :
                playing && claimable && !process
                    ?
                    < img src={LetterClaim} className='absolute h-[35%] top-[5%] right-[20%] animate-ready' />
                    :!deposit?
                    < img src={LetterDeposit} className='absolute h-[25%] top-[10%] right-[16%] animate-ready' />
                    :
                    < img src={LetterSpin} className='absolute h-[40%] top-[5%] right-[20%] animate-ready' />
            } */}
            {!deposit && !playing ?
            < img src={LetterDeposit} className='absolute h-[25%] top-[10%] right-[16%] animate-ready' />
            :
            deposit && !playing 
            ?
            < img src={LetterSpin} className='absolute h-[40%] top-[5%] right-[20%] animate-ready' />
            :
            <></>}
            <img src={Fire} className={deposit ?
                'absolute h-[40%] top-[0%] right-[-5%] animate-fire'
                :
                'absolute h-[40%] top-[0%] right-[-5%]'} />
        </div>
    )
}

export default memo(MarkPanel)
