import { memo } from 'react'
import './style.css'
import { LuckyWheel } from './LuckyWheel'
// import { COLORS } from '@/data/constant'

export type Props = {
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

export default memo(LuckyWheel)
