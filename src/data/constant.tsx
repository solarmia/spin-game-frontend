import { Lose, SolSymbol } from "@/assets"
import { Item } from "@/types";

export const Data = (): Item[] => {
  const values = import.meta.env.VITE_SPIN_VALUE
  const array: number[] = values.split(",").map(Number);
  const resultValue: Item[] = []
  for (let index = 0; index < array.length; index++) {
    const data: Item = {
      name: `${array[index] == 0 ? '' : array[index]}`,
      img: array[index] == 0 ? Lose : SolSymbol,
      percentpage: array[index]
    }
    resultValue.push(data)
  }
  return resultValue
}

export const addingStep = Number(import.meta.env.VITE_ADDING_STEP)
export const decreaseRate = Number(import.meta.env.VITE_DEC_RATE)
export const initialDistance = Number(import.meta.env.VITE_INIT_DISTANCE)
export const lastDistance = Number(import.meta.env.VITE_LAST_DISTANCE)

export const rpcURL = import.meta.env.VITE_RPC_URL
export const baseUrl = import.meta.env.VITE_SERVER_URL
export const fee = import.meta.env.VITE_FEE
export const net = import.meta.env.VITE_SOLANA_NET
export const RBYAmount = import.meta.env.VITE_RBY_AMOUNT
export const treasury = import.meta.env.VITE_TREASURY_WALLET
export const treasuryToken = import.meta.env.VITE_TREASURY_TOKEN_ACCOUNT
export const RBYTokenAddr = import.meta.env.VITE_TOKEN_ADDR
