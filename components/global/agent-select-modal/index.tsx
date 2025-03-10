"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAgentSelected } from "@/hooks/agentSelect"

// interface Agent {
//   id: string
//   name: string
//   role: string
//   image: string
//   email: string
//   title: string
// }

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

interface AgentSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onAgentSelect: (agentId: string) => void
}

export function AgentSelectionModal({ isOpen, onClose, onAgentSelect }: AgentSelectionModalProps) {

  const {selectedAgentId, setSelectedAgentId, userAgents, handleAgentSelect, handleSubmit} = useAgentSelected(onClose, onAgentSelect)
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Choose an Agent</DialogTitle>
          <DialogDescription>Select an agent to help you with your real estate needs.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-2">
            {userAgents?.data?.map((agent) => (
              <div
                key={agent.id}
                className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out
                  ${
                    selectedAgentId === agent.id
                      ? "bg-primary/5 shadow-[0_0_0_2px] shadow-primary/50"
                      : "hover:bg-muted"
                  }`}
                onClick={() => handleAgentSelect(agent.id)}
              >
                <div className="relative w-12 h-12 mr-3 flex-shrink-0">
                  <Image
                    src={agent.image || "/placeholder.svg"}
                    alt={agent.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  {selectedAgentId === agent.id && (
                    <div className="absolute -right-1 -bottom-1 bg-primary text-primary-foreground rounded-full p-0.5 shadow-md">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-sm truncate">{agent.name}</h3>
                  {/* <p className="text-xs text-muted-foreground truncate">{agent.title}</p> */}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex justify-end mt-4">
          <Button onClick={handleSubmit} disabled={!selectedAgentId}>
            Continue with Selected Agent
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

