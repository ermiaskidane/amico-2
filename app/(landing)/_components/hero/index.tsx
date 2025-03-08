import Image from 'next/image'
import React from 'react'

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {  MapPin, Search,} from "lucide-react"
import { Button } from '@/components/ui/button'

const Hero = () => {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-10" />
      <div className="relative h-[600px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop"
          alt="Luxury home exterior"
          fill
          priority
          // className="object-cover opacity-75 bg-[#000000]"
          className="object-cover "
        />
        <div className="container relative z-20 mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white drop-shadow-md">
              Find Your <span className="text-primary-foreground">Dream Home</span> With Ease
            </h1>
            <p className="text-xl text-white/90 drop-shadow">
              Discover the perfect property that matches your lifestyle and preferences.
            </p>
          </div>

          <div className="mt-8 max-w-4xl bg-background/95 backdrop-blur-sm p-4 rounded-xl shadow-lg">
            <Tabs defaultValue="buy" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="rent">Rent</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
              </TabsList>
              <TabsContent value="buy" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="text" placeholder="City, Address, ZIP" className="pl-8" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Property Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price Range</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100k-300k">$100k - $300k</SelectItem>
                        <SelectItem value="300k-500k">$300k - $500k</SelectItem>
                        <SelectItem value="500k-800k">$500k - $800k</SelectItem>
                        <SelectItem value="800k-1m">$800k - $1M+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="mt-auto" size="lg">
                    <Search className="mr-2 h-4 w-4" /> Search Properties
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="rent" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="text" placeholder="City, Address, ZIP" className="pl-8" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Property Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Monthly Rent</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                        <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                        <SelectItem value="2000-3000">$2,000 - $3,000</SelectItem>
                        <SelectItem value="3000+">$3,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="mt-auto" size="lg">
                    <Search className="mr-2 h-4 w-4" /> Find Rentals
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="sell" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Property Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="text" placeholder="Enter your property address" className="pl-8" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Property Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="mt-auto" size="lg">
                    Get Estimate
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero