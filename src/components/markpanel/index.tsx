import { memo } from 'react'

import { MarkBoard, Fire, LetterSpin, LetterDeposit, LetterClaim, LetterConnect } from '@/assets'
import { useApp } from '@/context'

const MarkPanel = () => {
    const { deposit, playing, status } = useApp();

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
            {status == 'deposit' ?
                < img src={LetterDeposit} className='absolute h-[25%] top-[10%] right-[16%] animate-ready' />
                :
                status == 'spin'
                    ?
                    < img src={LetterSpin} className='absolute h-[40%] top-[5%] right-[20%] animate-ready' />
                    :
                    status == 'claim'
                        ?
                        < img src={LetterClaim} className='absolute h-[35%] top-[5%] right-[20%] animate-ready' />
                        :
                        status == undefined
                            ?
                            < img src={LetterConnect} className='absolute h-[25%] top-[10%] right-[15%] animate-ready' />
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
