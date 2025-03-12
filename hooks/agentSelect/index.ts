import { onGetAllUser, onUpdateUserRole } from "@/actions/auth"
import { AgentInfo } from "@/components/global/agent-select-modal"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

// interface Agent {
//     id: string
//     name: string
//     role: string
//     image: string
//     email: string
//   }

  interface Agent {
    id: string
    name: string
    role: string
    image: string | null
    email: string
    // title: string
  }
  
  // Mock data for agent specialties
  const agentSpecialties = [
    "Luxury Homes",
    "First-time Homebuyers",
    "Investment Properties",
    "Waterfront",
    "Condos",
    "Urban Properties",
    "Rural Properties",
    "Commercial",
    "Vacation Homes",
    "New Construction",
    "Historic Homes",
    "Foreclosures",
  ]


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


// export const useAgentSelected = (
//   onClose: () => void,
//   onAgentSelect: (agentId: string) => void
// ) => {
//   const client = useQueryClient();
//   const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  
//   // Fetch the list of users
//   const { data: userAgents } = useQuery({
//     queryKey: ["get-user"],
//     queryFn: () => onGetAllUser()
//   });

//   const handleAgentSelect = (agentId: string) => {
//     setSelectedAgentId(agentId);
//   };

//   // Mutation to update a user's role to AGENT
//   const { mutate: updateToAgent, isPending: isUpdating } = useMutation({
//     mutationKey: ["update-to-agent"],
//     mutationFn: async (userId: string) => {
//       // Assuming you have a function to update user role
//       const response = await onUpdateUserRole(userId, "AGENT");
//       return response;
//     },
//     onSuccess: (data) => {
//       toast(data?.status !== 200 ? "Error" : "User promoted to agent", {
//         description: data?.message,
//       });
      
//       // Call the callback to inform the parent component
//       if (selectedAgentId) {
//         onAgentSelect(selectedAgentId);
//       }
      
//       // Close the modal
//       onClose();
//     },
//     onSettled: async () => {
//       // Invalidate queries to refresh data
//       await client.invalidateQueries({
//         queryKey: ["get-user"],
//       });
//       await client.invalidateQueries({
//         queryKey: ["get-agents"],
//       });
//     },
//   });

//   const handleSubmit = () => {
//     if (selectedAgentId) {
//       // Trigger the mutation to update the user role
//       updateToAgent(selectedAgentId);
//     }
//   };

//   return {
//     selectedAgentId,
//     setSelectedAgentId,
//     userAgents,
//     handleAgentSelect,
//     handleSubmit,
//     isUpdating
//   };
// };

export const useAgentSelected2 = (
  isOpen: boolean,
  onClose: () => void,
  onAgentSelect: (agentId: string, agentInfo?: AgentInfo) => void
) =>{

  const client = useQueryClient();

  const { data: AllUserToAgent } = useQuery({
    queryKey: ["get-user"],
    queryFn: () => onGetAllUser()
  })

  // const mockAgents: Agent[] = [
  //   {
  //     id: "1",
  //     name: "David Anderson",
  //     role: "AGENT",
  //     image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
  //     email: "david@estateease.com",
  //     title: "Senior Real Estate Agent",
  //   },
  //   {
  //     id: "2",
  //     name: "Jessica Martinez",
  //     role: "AGENT",
  //     image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop",
  //     email: "jessica@estateease.com",
  //     title: "Real Estate Consultant",
  //   },
  //   {
  //     id: "3",
  //     name: "Michael Johnson",
  //     role: "AGENT",
  //     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  //     email: "michael@estateease.com",
  //     title: "Luxury Property Specialist",
  //   },
  //   {
  //     id: "4",
  //     name: "Emily Brown",
  //     role: "AGENT",
  //     image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
  //     email: "emily@estateease.com",
  //     title: "First-Time Homebuyer Specialist",
  //   },
  //   {
  //     id: "5",
  //     name: "Robert Lee",
  //     role: "AGENT",
  //     image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop",
  //     email: "robert@estateease.com",
  //     title: "Commercial Real Estate Expert",
  //   },
  //   {
  //     id: "6",
  //     name: "Sarah Wilson",
  //     role: "AGENT",
  //     image: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=200&auto=format&fit=crop",
  //     email: "sarah@estateease.com",
  //     title: "Residential Property Manager",
  //   },
  // ]

  const [step, setStep] = useState(1)
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

  // Agent information form state
  const [agentInfo, setAgentInfo] = useState<AgentInfo>({
    title: "",
    licenseId: "",
    yearsActive: 0,
    bio: "",
    specialties: [],
  })

  const handleAgentSelect = (agentId: string) => {
    const agent = AllUserToAgent?.data?.find((a) => a.id === agentId)
    setSelectedAgentId(agentId)
    if (agent) {
      setSelectedAgent(agent)
      setAgentInfo((prev) => ({
        ...prev,
        // title: agent.title,
      }))
    }
  }

  const handleNext = () => {
    if (step === 1 && selectedAgentId) {
      setStep(2)
    } else if (step === 2) {
      // Validate form before proceeding
      if (agentInfo.title && agentInfo.bio && agentInfo.specialties.length > 0) {
        setStep(3)
      } else {
        alert("Please fill out all required fields")
      }
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const resetModal = () => {
    setStep(1)
    setSelectedAgentId(null)
    setSelectedAgent(null)
    setAgentInfo({
      title: "",
      licenseId: "",
      yearsActive: 0,
      bio: "",
      specialties: [],
    })
    onClose()
  }

  const handleSpecialtyToggle = (specialty: string) => {
    setAgentInfo((prev) => {
      if (prev.specialties.includes(specialty)) {
        return {
          ...prev,
          specialties: prev.specialties.filter((s) => s !== specialty),
        }
      } else {
        return {
          ...prev,
          specialties: [...prev.specialties, specialty],
        }
      }
    })
  }

  const removeSpecialty = (specialty: string) => {
    setAgentInfo((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((s) => s !== specialty),
    }))
  }

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Choose an Agent"
      case 2:
        return "Agent Information"
      case 3:
        return "Confirm Details"
      default:
        return "Agent Selection"
    }
  }

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Select an agent to help you with your real estate needs."
      case 2:
        return "Provide additional information about the selected agent."
      case 3:
        return "Review and confirm the agent details."
      default:
        return ""
    }
  }

  // Mutation to update a user's role to AGENT
  const { mutate: updateToAgent, isPending: isUpdating } = useMutation({
    mutationKey: ["update-to-agent"],
    mutationFn: async (params: { agentInfos: AgentInfo; userId: string }) => {
      
      // Assuming you have a function to update user role
      const response = await onUpdateUserRole(
        params.agentInfos, 
        params.userId
      );

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

    console.log("!!!!!!!!!!!!!!!!", selectedAgentId, agentInfo)
    if (selectedAgentId) {
      updateToAgent({
        agentInfos: agentInfo,
        userId: selectedAgentId
      })
      resetModal()
    }
  }

  return {
    AllUserToAgent,
    resetModal, 
    getStepTitle, 
    getStepDescription, 
    step, 
    handleBack,
    selectedAgentId, 
    handleAgentSelect, 
    selectedAgent,
    agentInfo,
    setAgentInfo,
    handleNext,
    removeSpecialty,
    agentSpecialties,
    handleSpecialtyToggle,
    handleSubmit
  }
}