import { z } from "zod"
import { PropertyType, PriceInterval, PropertyStatus } from '@prisma/client';

const propertyTypeSchema = z.enum([
  PropertyType.FOR_SALE,
  PropertyType.FOR_RENT,
  // Include all other values from your PropertyType enum
]);

export const propertySchema = z.object({
  id: z.string(),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  state: z.string().min(1, {
    message: "State is required.",
  }),
  zipCode: z.string().min(1, {
    message: "Zip code is required.",
  }),
  price: z.string(),
  beds: z.coerce.number().min(0),
  baths: z.coerce.number().min(0),
  sqft: z.coerce.number().min(0),
  type: propertyTypeSchema,
  isNew: z.boolean().default(false),
  propertyType: z.string(),
  yearBuilt: z.coerce.number(),
  garage: z.coerce.number().min(0),
  lotSize: z.coerce.number().min(0),
  description: z.string(),
  features: z.array(z.string()),
  amenities: z.array(z.string()),
  images: z.array(z.string()),
  agentId: z.string(),
  // agent: z.object({
  //   title: z.string(),
  //   bio: z.string(),
  //   specialties: z.array(z.string()),
  //   licenseId: z.string(),
  //   yearsActive: z.coerce.number().min(0),
  // }),
})