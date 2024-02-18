import { memo } from 'react'

import { Daggers, Ruby, Solana } from '@/assets'

import './style.css'

const Banner = () => {
    return (
        <div className='rounded-[20px] bg-[#DE8C22] w-[150px] h-[50px] p-[10px] absolute left-[50px] top-[50px] flex justify-around items-center'>
            <img src={Solana} className='h-[100%]'/>
            <img src={Daggers} className='h-[100%]'/>
            <img src={Ruby} className='h-[100%]'/>
        </div>
    )
}

export default memo(Banner)
