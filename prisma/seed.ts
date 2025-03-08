import { PrismaClient, UserRole, PropertyType, PropertyStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.propertyImage.deleteMany({})
  await prisma.inquiry.deleteMany({})
  await prisma.property.deleteMany({})
  await prisma.agentRating.deleteMany({})
  await prisma.agentReview.deleteMany({})
  await prisma.agent.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.feature.deleteMany({})
  await prisma.amenity.deleteMany({})
  await prisma.testimonial.deleteMany({})
  await prisma.partner.deleteMany({})

  // Create users and agents
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@estateease.com',
      password: await bcrypt.hash('password123', 10),
      role: UserRole.ADMIN,
      emailVerified: true
    },
  })

  const agentUser1 = await prisma.user.create({
    data: {
      name: 'David Anderson',
      email: 'david@estateease.com',
      password: await bcrypt.hash('password123', 10),
      role: UserRole.AGENT,
      phone: '(555) 123-4567',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
      emailVerified: true
    },
  })

  const agent1 = await prisma.agent.create({
    data: {
      userId: agentUser1.id,
      title: 'Senior Real Estate Agent',
      bio: 'With over 10 years of experience in real estate, David specializes in luxury properties and investment opportunities.',
      specialties: ['Luxury Homes', 'Investment Properties', 'Waterfront'],
      licenseId: 'CA-REB-12345',
      yearsActive: 10,
    },
  })

  const agentUser2 = await prisma.user.create({
    data: {
      name: 'Jessica Martinez',
      email: 'jessica@estateease.com',
      password: await bcrypt.hash('password123', 10),
      role: UserRole.AGENT,
      phone: '(555) 987-6543',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop',
      emailVerified: true
    },
  })

  const agent2 = await prisma.agent.create({
    data: {
      userId: agentUser2.id,
      title: 'Real Estate Consultant',
      bio: 'Jessica focuses on helping first-time homebuyers navigate the market with confidence.',
      specialties: ['First-time Homebuyers', 'Condos', 'Urban Properties'],
      licenseId: 'CA-REB-67890',
      yearsActive: 5,
    },
  })

  // Create features
  const featuresData = [
    { name: 'Open Floor Plan', icon: 'layout' },
    { name: 'Gourmet Kitchen', icon: 'utensils' },
    { name: 'Walk-in Closets', icon: 'door-closed' },
    { name: 'Home Office', icon: 'briefcase' },
    { name: 'Smart Home System', icon: 'smartphone' },
    { name: 'Hardwood Floors', icon: 'square' },
    { name: 'Fireplace', icon: 'flame' },
    { name: 'High Ceilings', icon: 'arrows-up-down' },
    { name: 'Outdoor Kitchen', icon: 'chef-hat' },
    { name: 'Swimming Pool', icon: 'droplets' },
  ]

  const features = await Promise.all(
    featuresData.map(feature => 
      prisma.feature.create({
        data: feature
      })
    )
  )

  // Create amenities
  const amenitiesData = [
    { name: 'Central Heating', icon: 'thermometer' },
    { name: 'Garage', icon: 'car' },
    { name: 'Garden', icon: 'trees' },
    { name: 'Internet', icon: 'wifi' },
    { name: 'Air Conditioning', icon: 'fan' },
    { name: 'Modern Bathroom', icon: 'shower-head' },
  ]

  const amenities = await Promise.all(
    amenitiesData.map(amenity => 
      prisma.amenity.create({
        data: amenity
      })
    )
  )

  // Create properties
  const modernVilla = await prisma.property.create({
    data: {
      title: 'Modern Luxury Villa',
      slug: 'modern-luxury-villa',
      description: 'This stunning modern villa offers luxurious living with panoramic city views. Featuring an open floor plan, gourmet kitchen, and resort-style pool.',
      price: 2450000,
      type: PropertyType.FOR_SALE,
      status: PropertyStatus.ACTIVE,
      featured: true,
      isNew: true,
      address: '123 Skyline Drive',
      city: 'Beverly Hills',
      state: 'CA',
      zipCode: '90210',
      latitude: 34.0736,
      longitude: -118.4004,
      beds: 5,
      baths: 4,
      squareFeet: 3200,
      lotSize: 5400,
      yearBuilt: 2020,
      garage: 2,
      propertyType: 'Villa',
      agentId: agent1.id,
      features: {
        connect: features.slice(0, 5).map(f => ({ id: f.id }))
      },
      amenities: {
        connect: amenities.slice(0, 3).map(a => ({ id: a.id }))
      },
    },
  })

  // Add images to modern villa
  await prisma.propertyImage.createMany({
    data: [
      {
        url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&auto=format&fit=crop',
        alt: 'Modern Luxury Villa Exterior',
        propertyId: modernVilla.id,
        isPrimary: true,
        order: 0,
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
        alt: 'Modern Luxury Villa Living Room',
        propertyId: modernVilla.id,
        order: 1,
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&auto=format&fit=crop',
        alt: 'Modern Luxury Villa Kitchen',
        propertyId: modernVilla.id,
        order: 2,
      },
      {
        url: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=800&auto=format&fit=crop',
        alt: 'Modern Luxury Villa Bedroom',
        propertyId: modernVilla.id,
        order: 3,
      },
    ],
  })

  const downtownPenthouse = await prisma.property.create({
    data: {
      title: 'Downtown Penthouse',
      slug: 'downtown-penthouse',
      description: 'Luxurious downtown penthouse with breathtaking city views. Features floor-to-ceiling windows, designer kitchen, and a private rooftop terrace.',
      price: 1850000,
      type: PropertyType.FOR_SALE,
      status: PropertyStatus.ACTIVE,
      featured: true,
      isNew: false,
      address: '456 Urban Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      latitude: 40.7128,
      longitude: -74.0060,
      beds: 3,
      baths: 2,
      squareFeet: 1800,
      lotSize: 1800,
      yearBuilt: 2018,
      garage: 1,
      propertyType: 'Penthouse',
      agentId: agent2.id,
      features: {
        connect: features.slice(2, 7).map(f => ({ id: f.id }))
      },
      amenities: {
        connect: amenities.slice(2, 6).map(a => ({ id: a.id }))
      },
    },
  })

  // Add images to downtown penthouse
  await prisma.propertyImage.createMany({
    data: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
        alt: 'Downtown Penthouse Exterior',
        propertyId: downtownPenthouse.id,
        isPrimary: true,
        order: 0,
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=800&auto=format&fit=crop',
        alt: 'Downtown Penthouse Living Room',
        propertyId: downtownPenthouse.id,
        order: 1,
      },
      {
        url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=800&auto=format&fit=crop',
        alt: 'Downtown Penthouse Kitchen',
        propertyId: downtownPenthouse.id,
        order: 2,
      },
    ],
  })

  const waterfrontCondo = await prisma.property.create({
    data: {
      title: 'Waterfront Condo',
      slug: 'waterfront-condo',
      description: 'Beautiful waterfront condo with stunning ocean views. Enjoy resort-style amenities including a pool, fitness center, and private beach access.',
      price: 3200,
      priceInterval: 'MONTHLY',
      type: PropertyType.FOR_RENT,
      status: PropertyStatus.ACTIVE,
      featured: true,
      isNew: true,
      address: '789 Harbor View',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      latitude: 25.7617,
      longitude: -80.1918,
      beds: 2,
      baths: 2,
      squareFeet: 1500,
      yearBuilt: 2019,
      garage: 1,
      propertyType: 'Condo',
      agentId: agent1.id,
      features: {
        connect: features.slice(5, 10).map(f => ({ id: f.id }))
      },
      amenities: {
        connect: amenities.slice(1, 6).map(a => ({ id: a.id }))
      },
    },
  })

  // Add images to waterfront condo
  await prisma.propertyImage.createMany({
    data: [
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
        alt: 'Waterfront Condo View',
        propertyId: waterfrontCondo.id,
        isPrimary: true,
        order: 0,
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop',
        alt: 'Waterfront Condo Interior',
        propertyId: waterfrontCondo.id,
        order: 1,
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop',
        alt: 'Waterfront Condo Bedroom',
        propertyId: waterfrontCondo.id,
        order: 2,
      },
    ],
  })

  // Create testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Sarah Johnson',
        role: 'Homeowner',
        content: 'Working with EstateEase was a dream come true. They helped me find the perfect home for my family in just two weeks. The process was smooth and stress-free.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
        featured: true,
      },
      {
        name: 'Michael Chen',
        role: 'First-time Buyer',
        content: 'As a first-time homebuyer, I was nervous about the process. The team at EstateEase guided me through every step and found me a beautiful condo within my budget.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        featured: true,
      },
      {
        name: 'Emily Rodriguez',
        role: 'Property Seller',
        content: 'I sold my house through EstateEase and got more than my asking price! Their marketing strategy and professional photography made all the difference.',
        rating: 4,
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
        featured: true,
      },
    ],
  })

  // Create partners
  await prisma.partner.createMany({
    data: [
      {
        name: 'Luxury Builders Inc.',
        logo: 'https://images.unsplash.com/photo-1563694983011-6f4d90358083?q=80&w=200&auto=format&fit=crop',
        website: 'https://example.com/partner1',
        featured: true,
        order: 1,
      },
      {
        name: 'Modern Home Finance',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop',
        website: 'https://example.com/partner2',
        featured: true,
        order: 2,
      },
      {
        name: 'Premier Insurance',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop',
        website: 'https://example.com/partner3',
        featured: true,
        order: 3,
      },
      {
        name: 'Elegant Interiors',
        logo: 'https://images.unsplash.com/photo-1563694983011-6f4d90358083?q=80&w=200&auto=format&fit=crop',
        website: 'https://example.com/partner4',
        featured: true,
        order: 4,
      },
    ],
  })

  console.log('Database has been seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
