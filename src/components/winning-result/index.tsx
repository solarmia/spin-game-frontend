import './style.css'

type Props = {
  winningResult: { name: string; img: string }
  handleContinue: () => void
}

const WinningResult = ({ winningResult, handleContinue }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center gap-2 px-5 py-1 bg-white rounded-lg modal-container'>
      <img src={'vite.svg'} className='w-[30%]' />
      <span className='text-lg font-bold'>Chúc mừng</span>
      <span className='text-lg font-bold'>Phần thưởng của bạn là</span>
      <span className='text-lg font-bold text-[#C49B60]'>{winningResult.name}</span>
      <img src={winningResult.img} className='w-[25%] object-cover' />
      <div className='flex items-center justify-around mb-3 xs:gap-5 md:gap-10'>
        <button
          className={`px-10 xs:px-3 text-md xs:text-sm py-2 border-[1.5px] rounded-full  transition-all ease-in-out duration-150`}
          onClick={handleContinue}
        >
          Trang chủ
        </button>
        <button
          className={`px-6 py-2 text-md xs:text-sm rounded-full   text-white   transition-all ease-in-out duration-150`}
          onClick={handleContinue}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  )
}

export default WinningResult
