import { PropertyType, PropertyStatus, PriceInterval, InquiryStatus, UserRole } from '@prisma/client'

// Property Type Helper
export type PropertyWithDetails = {
  id: string
  title: string
  slug: string
  description: string
  price: number
  priceInterval: PriceInterval | null
  type: PropertyType
  status: PropertyStatus
  featured: boolean
  isNew: boolean
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  latitude: number | null
  longitude: number | null
  beds: number
  baths: number
  squareFeet: number
  lotSize: number | null
  yearBuilt: number | null
  garage: number | null
  propertyType: string
  features: {
    id: string
    name: string
    icon: string | null
  }[]
  amenities: {
    id: string
    name: string
    icon: string | null
  }[]
  images: {
    id: string
    url: string
    alt: string | null
    isPrimary: boolean
    order: number
  }[]
  agent: {
    id: string
    title: string
    user: {
      id: string
      name: string
      email: string
      image: string | null
      phone: string | null
    }
  } | null
  createdAt: Date
  updatedAt: Date
}

// Inquiry Type Helper
export type InquiryWithDetails = {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  date: Date | null
  status: InquiryStatus
  property: {
    id: string
    title: string
    slug: string
    address: string
  }
  createdAt: Date
  updatedAt: Date
}

// User Type Helper
export type UserWithDetails = {
  id: string
  name: string
  email: string
  image: string | null
  phone: string | null
  role: UserRole
  agent?: {
    id: string
    title: string
    bio: string | null
    specialties: string[]
    licenseId: string | null
    yearsActive: number
  } | null
  createdAt: Date
  updatedAt: Date
}
