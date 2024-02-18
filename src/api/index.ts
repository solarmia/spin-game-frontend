import { Data } from '@/data/constant'

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
