import { Data } from '@/data/constant'
import { depositProps } from '@/types';
import api from "@/utils/api";

function callApi(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * Data.length)
      resolve(randomNumber)
    }, 3000)
  })
}

export async function delayedApiCall() {
  try {
    const result = await callApi()
    return result
  } catch (error) {
    throw error
  }
}

export const deposit = async (data: depositProps) => {
  try {
    const res = await api.post('/wallet/deposit', data)
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.warn(e)
    throw (e)
  }
}

export const walletService = {
  deposit
}