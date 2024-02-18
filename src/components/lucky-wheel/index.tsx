import { memo, useEffect, useRef } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import './style.css'
// import { COLORS } from '@/data/constant'

type Props = {
  /**
   * id of section tag
   */
  id: string

  /**
   * Css cho bánh xe khi quay
   * deg: góc quay sau khi tìm ra kết quả phần thưởng để kim trỏ đúng vị trí phần thưởng
   * timingFunc: tốc độ quay và độ mượt cho bánh xe
   * timeDuration: transiton duration
   */
  styleRotate: {
    deg: number
    timingFunc: string
    timeDuration: number
  }

  /**
   * Check trạng thái của vòng quay
   */
  spinning?: boolean

  /**
   * Mảng các phần thưởng
   */
  prizes: { name: string; img: string; percentpage: number }[]

  /**
   * Thời gian kim lắc một lần (animation-duration)
   */
  timeNeedleRotate: number
}

const LuckyWheel = ({ id, styleRotate, prizes, spinning, timeNeedleRotate }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const arrowRef = useRef<HTMLDivElement | null>(null)

  /**
   * function to drawl lucky wheel with canvas
   * @param prizes is list prize
   */
  const drawWheel = (prizes: { name: string; img: string; percentpage: number }[]) => {
    const num = prizes.length
    const rotateDeg = 360 / num / 2 + 90
    const html = []

    const ele = document.getElementById(id)
    const ulElementFirstRender = document.querySelector('.luckywheel-list')

    if (ulElementFirstRender) {
      ulElementFirstRender.remove()
    }

    if (ele) {
      const prizeItems = document.createElement('ul')
      const container = ele.querySelector('.luckywheel-container')

      if (canvasRef.current && container) {
        const ctx = canvasRef.current.getContext('2d')!
        for (let i = 0; i < num; i++) {
          ctx.save()
          ctx.beginPath()
          ctx.translate(250, 250) // Center Point
          ctx.moveTo(0, 0)
          ctx.rotate((((360 / num) * i - rotateDeg) * Math.PI) / 180)
          ctx.arc(0, 0, 250, 0, (2 * Math.PI) / num, false) // Radius
          ctx.fillStyle = '#ffffff'
          ctx.fill()
          ctx.lineWidth = 1
          ctx.strokeStyle = '#1A2B57'
          ctx.stroke()
          ctx.restore()

          const htmlString = ``

          html.push(htmlString)
        }
        prizeItems.className = 'luckywheel-list'
        container.appendChild(prizeItems)
        prizeItems.innerHTML = html.join('')
      }
    }
  }

  function rotateArrow(spinningLuckyWheel?: boolean, timeNeedleRotate?: number) {
    if (arrowRef.current) {
      if (spinningLuckyWheel && timeNeedleRotate) {
        arrowRef.current.style.animation = `rotate ${timeNeedleRotate}s linear infinite`
      } else {
        arrowRef.current.style.animation = ''
      }
    }
    requestAnimationFrame(() => rotateArrow(spinningLuckyWheel, timeNeedleRotate))
  }

  useEffect(() => {
    void rotateArrow(spinning, timeNeedleRotate)
  }, [spinning, arrowRef, timeNeedleRotate])

  useEffect(() => {
    void drawWheel(prizes)
  }, [prizes])

  return (
    <div className='wrapper sm:w-[300px] md:w-[600px]' id='wrapper'>
      <section id='luckywheel' className='luckywheel'>
        <div className='luckywheel-btn'>
          <div ref={arrowRef} className='luckywheel-btn-icon '>
            <FaMapMarkerAlt className='text-[60px] text-[#1A2B57]' />
          </div>
        </div>

        <div
          className='luckywheel-container'
          style={
            styleRotate.deg !== 0
              ? {
                  transform: `rotate(${styleRotate.deg}deg)`,
                  transitionTimingFunction: styleRotate.timingFunc,
                  transitionDuration: `${styleRotate.timeDuration}s`
                }
              : {}
          }
        >
          <canvas ref={canvasRef} className='luckywheel-canvas' width={'500px'} height={'500px'} />
        </div>

        <div className='luckywheel-logo flex border-2 border-[#1A2B57]'>
          <img src={'vite.svg'} className='p-2' />
        </div>
      </section>
    </div>
  )
}

export default memo(LuckyWheel)
