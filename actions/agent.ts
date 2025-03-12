"use server"

import { client } from "@/lib/prisma"

export const onGetAllAgent = async() => {
  try {
    const allAgents = await client.agent.findMany({
      include: {
        user: true
      }
    })

    return {status: 200, allAgents}
  } catch(error) {
    return { 
      status: 400, 
      message: error instanceof Error ? error.message : "Unknown error occurred" 
    }
  }
}

// export const onGetUserInfo = async () => {
//   try{
//     const session = await auth.api.getSession({
//       headers: await headers()
//   })

//   const user = await client.user.findUnique({
//     where: {
//       id: session?.user.id
//     },
//   })

//   return {status: 200, user}
//   } catch(error){
//     return {
//       status: 400,
//     }
//   }
// }