import { onGetAgentRole, onGetUserInfo } from "@/actions/auth"
import { propertySchema } from "@/components/forms/houseForm/schema"
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { onCreateProperties, onGetPropertyInfo } from "@/actions/property"
import { CreatePropertyData } from "@/types"
import { useEffect, useState } from "react"
import { onGetAllAgent } from "@/actions/agent"
import { Agent, PropertyType } from "@prisma/client"

type PropertyFormValues = z.infer<typeof propertySchema>


export const useFeaturePage = () => {
  const { data } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => onGetUserInfo()
  })

  const { data: property } = useQuery({
    queryKey: ["property-info"],
    queryFn: () => onGetPropertyInfo()
  })

  return { data, property }
}

export const usePropertycreate = () => {
  const client = useQueryClient()
  // Fetch the list of users
  // const { data: userAgents } = useQuery({
  //   queryKey: ["get-agent"],
  //   queryFn: () => onGetAgentRole()
  // });

  const { data: Agents } = useQuery({
    queryKey: ["get-allAgent"],
    queryFn: () => onGetAllAgent()
  });

  console.log("MMMMMMMM", Agents)

  const { data: properties } = useQuery({
    queryKey: ["property-info"],
    queryFn: () => onGetPropertyInfo()
  });

  // console.log("LLLLLLLLL", userAgents)
  console.log("KKKKKKKKK", properties)
  // State for selected agent
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [open, setOpen] = useState(false)


  // Start with minimal default values
const defaultValues: Partial<PropertyFormValues> = {
  features: [],
  amenities: [],
  images: [],
  isNew: false
};

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues,
  })

  const { mutate, isPending, variables } = useMutation({
    mutationKey: ["create-property"],
    mutationFn: async(data: CreatePropertyData) => {
      const property = await onCreateProperties(data)

      return property
    },
    onSuccess: (data) => {
      return toast(data?.status !== 200 ? "Error" : "Success", {
        description: data?.message,
      })
    },
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: ["group-courses"],
      })
    },
  })

  const oncreateProperty = form.handleSubmit(async(data: PropertyFormValues) => {
    console.log(data)
    // Here you would typically save the data to your backend
    alert("Form submitted successfully!")
    mutate({
      createdAt: new Date(),
      title: data.title,
      description: data.description,
      price: parseFloat(data.price.replace(/[^0-9.]/g, '')), // Convert "$2,450,000" to 2450000
      type: data.type,
      address: data.address,
      city: data.city || "", // Add default values for required fields that might be missing in your form
      state: data.state || "",
      zipCode: data.zipCode || "",
      beds: data.beds,
      baths: data.baths, 
      squareFeet: data.sqft,
      lotSize: data.lotSize,
      yearBuilt: data.yearBuilt,
      garage: data.garage,
      propertyType: data.propertyType,
      features: data.features,
      amenities: data.amenities,
      agent: data.agent,
      images: data.images,
      isNew: data.isNew,
    })
  })

  // Update selected agent when agentId changes
  useEffect(() => {
    console.log("useEffect triggered", {
      agentId: form.watch("agentId"),
      availableAgents: Agents?.allAgents
    });
    
    const agentId = form.watch("agentId");
    if (Agents?.allAgents && agentId) {
      const agent = Agents.allAgents.find((a) => a.id === agentId);
      if (agent) {
        setSelectedAgent(agent);
      }
    } else if (Agents?.allAgents && Agents.allAgents.length > 0 && !agentId) {
      // If no agentId is set but we have agents, select the first one
      setSelectedAgent(Agents.allAgents[0]);
      form.setValue("agentId", Agents.allAgents[0].id);
    }
  }, [Agents?.allAgents, form.watch("agentId")]);

  // Then set values when data is available
useEffect(() => {
  if (properties?.data?.[0]) {
    const property = properties.data[0];
    // Reset form with new values
    form.reset({
      id: property.id,
      title: property.title,
      address: property.address,
      city: property.city,
      state: property.state,
      zipCode: property.zipCode,
      price: property.price?.toString(),
      beds: property.beds,
      baths: property.baths,
      sqft: property.squareFeet,
      type: property.type === "FOR_SALE" ? PropertyType.FOR_SALE : 
            property.type === "FOR_RENT" ? PropertyType.FOR_RENT : 
            undefined,
      isNew: property.isNew,
      propertyType: property.propertyType,
      yearBuilt: property.yearBuilt ?? undefined,
      garage: property.garage ?? undefined,
      lotSize: property.lotSize ?? undefined,
      description: property.description,
      features: property.features ? property.features.map(feat => feat.name) : [],
      amenities: property.amenities? property.amenities.map(amenty => amenty.name) : [],
      images: property.images ? property.images.map(img => img.url || img.path || img.src) : [],
      agentId: property.agentId || undefined
    });
  }
}, [properties, form]);

  return {oncreateProperty, form, Agents, open, setOpen, selectedAgent, setSelectedAgent}
}