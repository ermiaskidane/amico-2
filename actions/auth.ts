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