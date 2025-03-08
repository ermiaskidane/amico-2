import { onGetUserInfo } from "@/actions/auth"
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
import { onCreateProperties } from "@/actions/property"
import { CreatePropertyData } from "@/types"

type PropertyFormValues = z.infer<typeof propertySchema>


export const useFeaturePage = () => {
  const { data } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => onGetUserInfo()
  })

  return { data }
}

export const usePropertycreate = () => {
  const client = useQueryClient()

  const defaultValues: Partial<PropertyFormValues> = {
    id: 1,
    title: "Modern Luxury Villa",
    address: "123 Skyline Drive, Beverly Hills",
    city: "Beverly Hills",
    state: "CA",
    zipCode: "90210",
    price: "$2,450,000",
    beds: 5,
    baths: 4,
    sqft: 3200,
    type: "For Sale",
    isNew: true,
    propertyType: "Villa",
    yearBuilt: 2020,
    garage: 2,
    lotSize: 5400,
    description:
      "This stunning modern villa offers luxurious living with panoramic city views. Featuring an open floor plan, gourmet kitchen, and resort-style pool.",
    features: [
      "Open Floor Plan",
      "Gourmet Kitchen",
      "Walk-in Closets",
      "Home Office",
      "Smart Home System",
      "Hardwood Floors",
      "Fireplace",
      "High Ceilings",
      "Outdoor Kitchen",
      "Swimming Pool",
    ],
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&auto=format&fit=crop",
    ],
  }

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
      images: data.images,
      isNew: data.isNew,
    })
  })

  return {oncreateProperty, form}
}