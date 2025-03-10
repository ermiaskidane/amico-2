
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { onGetAllUser, onGetUserInfo } from "@/actions/auth"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"

export const useNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false)

  const handleAgentSelect = (agentId: string) => {
    console.log("Selected agent ID:", agentId)
    // Here you can add logic to handle the selected agent, such as redirecting to a contact page
    setIsAgentModalOpen(false)
  }

  const { data } = useQuery({
    queryKey: ["get-user"],
    queryFn: () => onGetAllUser()
  })

  const { data: UserInfo } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => onGetUserInfo()
  })

  const router = useRouter()

  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // redirect to login page
        },
      },
    });
  }

  return {
    isOpen, 
    setIsOpen,
    isAgentModalOpen,
    setIsAgentModalOpen,
    handleAgentSelect,
    data,
    UserInfo,
    onLogout,
  }
}