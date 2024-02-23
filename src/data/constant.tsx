import { Lose, SolSymbol } from "@/assets"

export const Data = [
  {
    name: '1',
    img: SolSymbol,
    percentpage: 1 // 1%
  },
  {
    name: '',
    img: Lose,
    percentpage: 0 // 1%
  },
  {
    name: '0.05',
    img: SolSymbol,
    percentpage: 0.05 // 10%
  },
  {
    name: '',
    img: Lose,
    percentpage: 0 // 60%
  },
  {
    name: '0.2',
    img: SolSymbol,
    percentpage: 0.2 // 20%
  },
  {
    name: '',
    img: Lose,
    percentpage: 0 // 40%
  },
  {
    name: '0.1',
    img: SolSymbol,
    percentpage: 0.1 // 50%
  },
  {
    name: '',
    img: Lose,
    percentpage: 0 // 60%
  },
]

export const addingStep = Number(import.meta.env.VITE_ADDING_STEP)
export const decreaseRate = Number(import.meta.env.VITE_DEC_RATE)
export const initialDistance = Number(import.meta.env.VITE_INIT_DISTANCE)
export const lastDistance = Number(import.meta.env.VITE_LAST_DISTANCE)

export const baseUrl = import.meta.env.VITE_SERVER_URL
export const depositFee = import.meta.env.VITE_DEPOSIT_FEE
export const withdrawFee = import.meta.env.VITE_WITHDRAW_FEE
export const claimFee = import.meta.env.VITE_CLAIM_FEE
export const net = import.meta.env.VITE_SOLANA_NET
export const RBYAmount = import.meta.env.VITE_RBY_AMOUNT
