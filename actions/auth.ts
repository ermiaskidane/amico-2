"use server"

import { AgentInfo } from "@/components/global/agent-select-modal"
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
  const AllUser = await client.user.findMany({
    select: {
      id: true,
      name: true,
      role: true,
      image: true,
      email: true,
    }
  })

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

export const onUpdateUserRole = async (agentInfos: AgentInfo, userId: string) => {
  try {
    // First check if the user already has an agent record
    const existingAgent = await client.agent.findUnique({
      where: {
        userId: userId
      }
    });

    // Update strategy depends on whether agent record exists
    if (existingAgent) {
      // Update existing agent record
      const updateToAgent = await client.user.update({
        where: {
          id: userId
        },
        data: {
          role: "AGENT",
          agent: {
            update: {
              bio: agentInfos.bio,
              licenseId: agentInfos.licenseId,
              specialties: agentInfos.specialties,
              title: agentInfos.title,
              yearsActive: agentInfos.yearsActive
            }
          }
        }
      });
      
      return {
        status: 200,
        data: updateToAgent
      }
    } else {
      // Create new agent record
      const updateToAgent = await client.user.update({
        where: {
          id: userId
        },
        data: {
          role: "AGENT",
          agent: {
            create: {
              bio: agentInfos.bio,
              licenseId: agentInfos.licenseId,
              specialties: agentInfos.specialties,
              title: agentInfos.title,
              yearsActive: agentInfos.yearsActive
            }
          }
        }
      });
      
      return {
        status: 200,
        data: updateToAgent
      }
    }
  } catch(error) {
    console.error("Error updating user to agent:", error);
    return {
      status: 400,
      message: error instanceof Error ? error.message : "Unknown error occurred"
    }
  }
}

export const onGetAgentRole = async () => {
  try {
    const userAgentRole = await client.user.findMany({
      where: {
        role: "AGENT"
      },
      select: {
        id: true,
        name: true,
        image: true
      }
    })

    return {
      status: 200,
      data: userAgentRole
    }
  } catch(error) {
    return { 
      status: 400, 
      message: error instanceof Error ? error.message : "Unknown error occurred" 
    }
  }
}