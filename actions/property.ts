"use server"

import { auth } from "@/lib/auth"
import { client } from "@/lib/prisma"
import { CreatePropertyData } from "@/types"
import { PropertyType } from "@prisma/client"
import { headers } from "next/headers"

// Function to generate a slug from a title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
    .trim() // Trim whitespace from both ends
    + '-' + Date.now(); // Add timestamp to ensure uniqueness
}

export const onGetPropertyInfo = async () => {
  try {
    const property = await client.property.findMany({
      include: {
        features: true,
        amenities: true,
        images: true,
        agent: true
      }
    })
    return {
      status: 200,
      data: property
    }
  } catch(error) {
    return { 
      status: 400, 
      message: error instanceof Error ? error.message : "Unknown error occurred" 
    }
  }
}

export const onCreateProperties = async(data: CreatePropertyData) => {
  try{
    const session = await auth.api.getSession({
      headers: await headers()
      })

      if(!session) return { status: 404}

      const userRole = await client.user.findUnique({
        where: {
          id: session.session.userId
        }
      })

      if (userRole?.role === "USER") return { status: 400}

    // Generate a slug from the title
    const slug = generateSlug(data.title);


    
    // Properly format the property data according to the Prisma schema
    const property = await client.property.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        slug: slug, // Add the generated slug
        type: data.type as PropertyType,
        status: "ACTIVE",
        isNew: data.isNew,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        beds: data.beds,
        baths: data.baths,
        squareFeet: data.squareFeet,
        lotSize: data.lotSize,
        yearBuilt: data.yearBuilt,
        garage: data.garage,
        propertyType: data.propertyType,
        
        // Handle features as a relation, not as a string array
        features: {
          connectOrCreate: data.features.map(featureName => ({
            where: { name: featureName },
            create: { name: featureName }
          }))
        },

        amenities: {
          connectOrCreate: data.amenities.map((amenity) => ({
            where: { name: amenity },
            create: { name: amenity }
          })) 
        },
        
        // Handle images
        images: {
          create: data.images.map((url, index) => ({
            url,
            isPrimary: index === 0,
            order: index
          }))
        }
      }
    });

    console.log("Property created successfully with ID:", property.id);
    
    // Serialize before returning
    const serializedProperty = JSON.parse(JSON.stringify(property));
    return {
      status: 200,
      data: serializedProperty
    };
  } catch(error) {
    // Convert error to a serializable format
    console.error("Error creating property:", error);
    
    // Return only serializable error information
    return { 
      status: 400, 
      message: error instanceof Error ? error.message : "Unknown error occurred" 
    }
  }
}