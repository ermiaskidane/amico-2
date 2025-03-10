import { Thermometer, Car, TreePine, Wifi, Fan, ShowerHeadIcon as Shower } from "lucide-react"

// List of available features
 export const availableFeatures = [
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
]

// List of available amenities with icons
export const amenitiesData = [
  { name: "Central Heating", icon: "thermometer" },
  { name: "Garage", icon: "car" },
  { name: "Garden", icon: "trees" },
  { name: "Internet", icon: "wifi" },
  { name: "Air Conditioning", icon: "fan" },
  { name: "Modern Bathroom", icon: "shower-head" },
]

// List of available agent specialties
export const agentSpecialties = [
  "Luxury Homes",
  "Investment Properties",
  "Waterfront",
  "First-time Buyers",
  "Commercial",
  "Vacation Homes",
  "Condos",
  "New Construction",
  "Historic Homes",
]

// Map icon names to Lucide icon components
export const iconMap = {
  thermometer: Thermometer,
  car: Car,
  trees: TreePine,
  wifi: Wifi,
  fan: Fan,
  "shower-head": Shower,
}