import { memo } from 'react'

import { MarkBoard, Fire, LetterSpin } from '@/assets'

type Props = {
    lockAmount: number | undefined
}

const MarkPanel = ({ lockAmount }: Props) => {
    // const handleUp = () => {
    //     setMulti(multi + 1)
    // }

    // const handleDown = () => {
    //     if (multi > 1) setMulti(multi - 1)
    // }

    return (
        <div className='absolute bottom-0 justify-center h-[25vh]'>
            <img src={MarkBoard} className='h-[100%]' />
            {lockAmount ?
                <span className='absolute h-[40%] top-[5%] text-center w-[100%] text-[30px]'>{lockAmount}</span>
                :
                <img src={LetterSpin} className='absolute h-[40%] top-[5%] right-[20%]' />
            }
            <img src={Fire} className={lockAmount ?
                'absolute h-[40%] top-[0%] right-[-5%] animate-fire'
                :
                'absolute h-[40%] top-[0%] right-[-5%]'} />
        </div>
    )
}

export default memo(MarkPanel)
