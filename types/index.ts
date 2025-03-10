import {PropertyType, Agent, PriceInterval, PropertyStatus, InquiryStatus, UserRole } from '@prisma/client'

// // First, define the enum to match your Prisma schema
// enum PropertyType {
//   FOR_SALE = "FOR_SALE",
//   FOR_RENT = "FOR_RENT",
//   AUCTION = "AUCTION"
//   // Add any other values that exist in your Prisma schema
// }

// // Also define the PriceInterval enum if needed
// enum PriceInterval {
//   DAILY = "DAILY",
//   WEEKLY = "WEEKLY",
//   MONTHLY = "MONTHLY",
//   YEARLY = "YEARLY"
//   // Match your Prisma schema values
// }

// // Also define PropertyStatus enum
// enum PropertyStatus {
//   ACTIVE = "ACTIVE",
//   PENDING = "PENDING",
//   SOLD = "SOLD",
//   RENTED = "RENTED",
//   INACTIVE = "INACTIVE"
//   // Match your Prisma schema values
// }

// Update your type to use the enum
export type CreatePropertyData = {
  title: string;
  slug?: string; // This is marked as @unique in your schema
  description: string;
  price: number;
  priceInterval?: PriceInterval | null; // Optional for sale properties
  type: PropertyType; // Using the enum instead of string
  status?: PropertyStatus; // Optional, has default in schema
  featured?: boolean;
  isNew?: boolean;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
  latitude?: number | null;
  longitude?: number | null;
  beds: number;
  baths: number;
  squareFeet: number;
  lotSize?: number | null;
  yearBuilt?: number | null;
  garage?: number | null;
  propertyType: string;
  features: string[]; // This should match how you handle features in your DB
  amenities: string[]
  images: string[]; // This should match how you handle images in your DB
  agent: Agent;
  createdAt: Date
  // updatedAt: Date
  // Add any other required fields
}
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
