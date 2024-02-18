import { memo } from 'react'

import { MarkBoard, Fire, Up, Down } from '@/assets'

type Props = {
    multi: number,
    setMulti: React.Dispatch<React.SetStateAction<number>>,
}

const MarkPanel = ({ multi, setMulti }: Props) => {
    const handleUp = () => {
        setMulti(multi + 1)
    }

    const handleDown = () => {
        if (multi > 1) setMulti(multi - 1)
    }

    return (
        <div className='absolute bottom-0 justify-center h-[25vh]'>
            <img src={MarkBoard} className='h-[100%]' />
            <img src={Fire} className='absolute h-[40%] top-[0%] right-[10%]' />
            <img src={Up} onClick={handleUp} className='absolute  h-[21%] bottom-[30%] right-[20%]' />
            <img src={Down} onClick={handleDown} className='absolute  h-[21%] bottom-[5%] right-[20%]' />
            <p className='absolute bottom-0 left-[47%] text-[3vh] text-white'>{multi}</p>
        </div>
    )
}

export default memo(MarkPanel)
