import { memo } from 'react'

import { Daggers, Ruby } from '@/assets'
import { useApp } from '@/context';
// #c52417
const Banner = () => {
    const { balance } = useApp();
    return (
        <div className='top-[50px] left-[50px] absolute flex justify-around items-center gap-2 p-[10px] rounded-[20px] h-[50px]' style={{ backgroundColor: `${balance ? "#ab9ff2" : "#fdff8c"}` }}>
            {/* <img src={Solana} className='h-[100%]'/>
            <img src={Daggers} className='h-[100%]'/> */}
            {balance ? <><img src={Ruby} className='h-[100%]' /> Balance: {balance}</> : <img src={Daggers} className='h-[100%]' />}
        </div>
    )
}

export default memo(Banner)
