'use server'

import { revalidatePath } from 'next/cache'

const API_KEY = process.env.API_KEY
const GO_BACKEND_URL = process.env.GO_BACKEND_URL || 'http://localhost:8080'

export async function sendMessage(message: string) {
  if (!API_KEY) {
    throw new Error('API key not configured')
  }

  try {
    const response = await fetch(`${GO_BACKEND_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
      },
      body: JSON.stringify({
        user_id: 'default-user',
        message: message,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    revalidatePath('/')
    return { message: data.response }
  } catch (error) {
    console.error('Error in sendMessage:', error)
    return { error: error instanceof Error ? error.message : 'An unknown error occurred' }
  }
}

