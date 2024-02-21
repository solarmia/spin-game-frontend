import { depositProps, gameProps } from '@/types';
import api from "@/utils/api";

export const play = async (data: gameProps) => {
  try {
    const res = await api.post('/game/play', data)
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.warn(e)
    throw (e)
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
