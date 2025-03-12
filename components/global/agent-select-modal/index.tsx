"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, ChevronLeft, ChevronRight, Trash2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { useAgentSelected2 } from "@/hooks/agentSelect"

export interface AgentInfo {
  title: string
  licenseId: string
  yearsActive: number
  bio: string
  specialties: string[]
}

interface AgentSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onAgentSelect: (agentId: string, agentInfo?: AgentInfo) => void
}

export function AgentSelectionModal({ isOpen, onClose, onAgentSelect }: AgentSelectionModalProps) {

  const { 
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
  } = useAgentSelected2(isOpen, onClose, onAgentSelect)

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{getStepTitle()}</DialogTitle>
          <DialogDescription>{getStepDescription()}</DialogDescription>
        </DialogHeader>

        {/* Step indicator */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              1
            </div>
            <div className={`w-10 h-1 ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              2
            </div>
            <div className={`w-10 h-1 ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              3
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-hidden">
          {step === 1 && (
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-2">
                {AllUserToAgent?.data?.map((agent) => (
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
          )}

          {step === 2 && selectedAgent && (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src={selectedAgent.image || "/placeholder.svg"}
                      alt={selectedAgent.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedAgent.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedAgent.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Agent Title</Label>
                      <Input
                        id="title"
                        value={agentInfo.title}
                        onChange={(e) => setAgentInfo({ ...agentInfo, title: e.target.value })}
                        placeholder="Enter agent title"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="licenseId">License ID<span className="text-gray-400 text-sm">(optional)</span></Label>
                      <Input
                        id="licenseId"
                        value={agentInfo.licenseId}
                        onChange={(e) => setAgentInfo({ ...agentInfo, licenseId: e.target.value })}
                        placeholder="Enter license ID"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearsActive">Years Active <span className="text-gray-400 text-sm">(optional)</span></Label>
                    <Input
                      id="yearsActive"
                      type="number"
                      value={agentInfo.yearsActive}
                      onChange={(e) =>
                        setAgentInfo({ ...agentInfo, yearsActive: Number.parseInt(e.target.value) || 0 })
                      }
                      placeholder="Enter years of experience"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Agent Bio <span className="text-gray-400 text-sm">(optional)</span></Label>
                    <Textarea
                      id="bio"
                      value={agentInfo.bio}
                      onChange={(e) => setAgentInfo({ ...agentInfo, bio: e.target.value })}
                      placeholder="Enter agent bio"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Agent Specialties</Label>
                    <p className="text-sm text-muted-foreground">Select all specialties that apply to this agent.</p>

                    {agentInfo.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-2 my-2">
                        {agentInfo.specialties.map((specialty, index) => (
                          <Badge key={index} className="flex items-center gap-1 px-3 py-1">
                            {specialty}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 rounded-full"
                              onClick={() => removeSpecialty(specialty)}
                            >
                              <Trash2 className="h-3 w-3" />
                              <span className="sr-only">Remove {specialty}</span>
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      {agentSpecialties.map((specialty) => (
                        <div key={specialty} className="flex items-center space-x-2">
                          <Checkbox
                            id={`specialty-${specialty}`}
                            checked={agentInfo.specialties.includes(specialty)}
                            onCheckedChange={() => handleSpecialtyToggle(specialty)}
                          />
                          <Label htmlFor={`specialty-${specialty}`} className="text-sm font-normal cursor-pointer">
                            {specialty}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}

          {step === 3 && selectedAgent && (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={selectedAgent.image || "/placeholder.svg"}
                      alt={selectedAgent.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{selectedAgent.name}</h3>
                    <p className="text-primary">{agentInfo.title}</p>
                    <p className="text-sm text-muted-foreground">{selectedAgent.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">License ID</h4>
                      <p>{agentInfo.licenseId || "Not provided"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Years Active</h4>
                      <p>{agentInfo.yearsActive}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Bio</h4>
                    <p className="mt-1">{agentInfo.bio}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Specialties</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {agentInfo.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center mt-4 sm:mt-0">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <Button variant="outline" onClick={resetModal}>
              Cancel
            </Button>
          )}

          {step < 3 ? (
            <Button onClick={handleNext} disabled={step === 1 && !selectedAgentId}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit}>Confirm Selection</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}



// import { useState } from "react"
// import Image from "next/image"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Check } from "lucide-react"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { useAgentSelected } from "@/hooks/agentSelect"

// // interface Agent {
// //   id: string
// //   name: string
// //   role: string
// //   image: string
// //   email: string
// //   title: string
// // }

// // const mockAgents: Agent[] = [
// //   {
// //     id: "1",
// //     name: "David Anderson",
// //     role: "AGENT",
// //     image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
// //     email: "david@estateease.com",
// //     title: "Senior Real Estate Agent",
// //   },
// //   {
// //     id: "2",
// //     name: "Jessica Martinez",
// //     role: "AGENT",
// //     image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop",
// //     email: "jessica@estateease.com",
// //     title: "Real Estate Consultant",
// //   },
// //   {
// //     id: "3",
// //     name: "Michael Johnson",
// //     role: "AGENT",
// //     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
// //     email: "michael@estateease.com",
// //     title: "Luxury Property Specialist",
// //   },
// //   {
// //     id: "4",
// //     name: "Emily Brown",
// //     role: "AGENT",
// //     image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
// //     email: "emily@estateease.com",
// //     title: "First-Time Homebuyer Specialist",
// //   },
// //   {
// //     id: "5",
// //     name: "Robert Lee",
// //     role: "AGENT",
// //     image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop",
// //     email: "robert@estateease.com",
// //     title: "Commercial Real Estate Expert",
// //   },
// //   {
// //     id: "6",
// //     name: "Sarah Wilson",
// //     role: "AGENT",
// //     image: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=200&auto=format&fit=crop",
// //     email: "sarah@estateease.com",
// //     title: "Residential Property Manager",
// //   },
// // ]

// interface AgentSelectionModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onAgentSelect: (agentId: string) => void
// }

// export function AgentSelectionModal({ isOpen, onClose, onAgentSelect }: AgentSelectionModalProps) {

//   const {selectedAgentId, setSelectedAgentId, userAgents, handleAgentSelect, handleSubmit} = useAgentSelected(onClose, onAgentSelect)
  
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[400px]">
//         <DialogHeader>
//           <DialogTitle>Choose an Agent</DialogTitle>
//           <DialogDescription>Select an agent to help you with your real estate needs.</DialogDescription>
//         </DialogHeader>
//         <ScrollArea className="h-[300px] pr-4">
//           <div className="space-y-2">
//             {userAgents?.data?.map((agent) => (
//               <div
//                 key={agent.id}
//                 className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out
//                   ${
//                     selectedAgentId === agent.id
//                       ? "bg-primary/5 shadow-[0_0_0_2px] shadow-primary/50"
//                       : "hover:bg-muted"
//                   }`}
//                 onClick={() => handleAgentSelect(agent.id)}
//               >
//                 <div className="relative w-12 h-12 mr-3 flex-shrink-0">
//                   <Image
//                     src={agent.image || "/placeholder.svg"}
//                     alt={agent.name}
//                     fill
//                     className="rounded-full object-cover"
//                   />
//                   {selectedAgentId === agent.id && (
//                     <div className="absolute -right-1 -bottom-1 bg-primary text-primary-foreground rounded-full p-0.5 shadow-md">
//                       <Check className="w-3 h-3" />
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex-grow min-w-0">
//                   <h3 className="font-medium text-sm truncate">{agent.name}</h3>
//                   {/* <p className="text-xs text-muted-foreground truncate">{agent.title}</p> */}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </ScrollArea>
//         <div className="flex justify-end mt-4">
//           <Button onClick={handleSubmit} disabled={!selectedAgentId}>
//             Continue with Selected Agent
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

