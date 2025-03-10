import { onGetAllUser, onUpdateUserRole } from "@/actions/auth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

interface Agent {
    id: string
    name: string
    role: string
    image: string
    email: string
  }


// export const useAgentSelected = (
//   onClose: () => void, 
//   onAgentSelect:  (agentId: string) => void
// ) => {
//   const client = useQueryClient()

//   const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null)

//   const handleAgentSelect = (agentId: string) => {
//     setSelectedAgentId(agentId)
//   }

//   const { data: userAgents } = useQuery({
//     queryKey: ["get-user"],
//     queryFn: () => onGetAllUser()
//   })

//   // const handleSubmit = () => {
//   //   console.log("????????????", selectedAgentId)
//   //   if (selectedAgentId) {
//   //     onAgentSelect(selectedAgentId)
//   //     onClose()
//   //   }

//     const { mutate, isPending, variables } = useMutation({
//       mutationKey: ["create-agent"],
//       mutationFn: async(data: Agent) => {
//         const property = await onCreateAgents(data)
  
//         return property
//       },
//       onSuccess: (data) => {
//         return toast(data?.status !== 200 ? "Error" : "Success", {
//           description: data?.message,
//         })
//       },
//       onSettled: async () => {
//         return await client.invalidateQueries({
//           queryKey: ["get-agents"],
//         })
//       },
//     })
//   }

//   const oncreateAgent = handleSubmit(async(data: any) => {
//     console.log("&&&&&&&&&&&", data)
//   })

//   return {
//     selectedAgentId,
//     setSelectedAgentId,
//     handleAgentSelect,
//     userAgents,
//     handleSubmit
//   }
// }


export const useAgentSelected = (
  onClose: () => void,
  onAgentSelect: (agentId: string) => void
) => {
  const client = useQueryClient();
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  
  // Fetch the list of users
  const { data: userAgents } = useQuery({
    queryKey: ["get-user"],
    queryFn: () => onGetAllUser()
  });

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgentId(agentId);
  };

  // Mutation to update a user's role to AGENT
  const { mutate: updateToAgent, isPending: isUpdating } = useMutation({
    mutationKey: ["update-to-agent"],
    mutationFn: async (userId: string) => {
      // Assuming you have a function to update user role
      const response = await onUpdateUserRole(userId, "AGENT");
      return response;
    },
    onSuccess: (data) => {
      toast(data?.status !== 200 ? "Error" : "User promoted to agent", {
        description: data?.message,
      });
      
      // Call the callback to inform the parent component
      if (selectedAgentId) {
        onAgentSelect(selectedAgentId);
      }
      
      // Close the modal
      onClose();
    },
    onSettled: async () => {
      // Invalidate queries to refresh data
      await client.invalidateQueries({
        queryKey: ["get-user"],
      });
      await client.invalidateQueries({
        queryKey: ["get-agents"],
      });
    },
  });

  const handleSubmit = () => {
    if (selectedAgentId) {
      // Trigger the mutation to update the user role
      updateToAgent(selectedAgentId);
    }
  };

  return {
    selectedAgentId,
    setSelectedAgentId,
    userAgents,
    handleAgentSelect,
    handleSubmit,
    isUpdating
  };
};