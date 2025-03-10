"use server"

import { auth } from "@/lib/auth"
import { client } from "@/lib/prisma"
import { headers } from "next/headers"

export const onGetUserInfo = async () => {
  try{
    const session = await auth.api.getSession({
      headers: await headers()
  })

  const user = await client.user.findUnique({
    where: {
      id: session?.user.id
    },
  })

  return {status: 200, user}
  } catch(error){
    return {
      status: 400,
    }
  }
}

export const onGetAllUser = async () => {
try {
  const AllUser = await client.user.findMany({})

  return {
    status: 200,
    data: AllUser
  }
} catch(error) {
  return { 
    status: 400, 
    message: error instanceof Error ? error.message : "Unknown error occurred" 
  }
}
}

export const onUpdateUserRole = async (userId: string, agent: string) => {
  try {
    const updateToAgent = await client.user.update({
      where: {
        id: userId
      },
      data: {
        role: "AGENT"
      }
    })

    return {
      status: 200,
      data: updateToAgent
    }
  } catch(error) {
    return { 
      status: 400, 
      message: error instanceof Error ? error.message : "Unknown error occurred" 
    }
  }
}