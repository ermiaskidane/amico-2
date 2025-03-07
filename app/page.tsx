import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Home, MapPin, Search, Star } from "lucide-react"
import { FeaturedProperties } from "@/components/featured-properties"
import { Testimonials } from "@/components/testimonials"
import { Partners } from "@/components/partners"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
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

        {/* Featured Properties Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Properties</h2>
              <p className="text-muted-foreground mt-2">Explore our handpicked selection of premium properties</p>
            </div>
            <div className="flex mt-4 md:mt-0">
              <Button variant="outline" className="mr-2">
                View All Properties
              </Button>
              <Button>New Listings</Button>
            </div>
          </div>

          <FeaturedProperties />
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Why Choose Us</h2>
              <p className="text-muted-foreground mt-2">
                We provide a seamless real estate experience with our expert team and innovative technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-background/60 backdrop-blur-sm border-primary/10 shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Extensive Property Selection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Access thousands of listings across various neighborhoods, ensuring you find the perfect match for
                    your needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/60 backdrop-blur-sm border-primary/10 shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Expert Guidance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our team of experienced real estate professionals provides personalized advice throughout your
                    journey.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/60 backdrop-blur-sm border-primary/10 shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Seamless Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    From initial search to final closing, we streamline every step of the buying or selling process.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight">What Our Clients Say</h2>
            <p className="text-muted-foreground mt-2">
              Hear from homeowners and buyers who found success with our services
            </p>
          </div>

          <Testimonials />
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Find Your Dream Home?</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Take the first step toward your new home today. Our team is ready to help you navigate the real estate
              market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Browse Properties
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
              >
                Contact an Agent
              </Button>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Our Trusted Partners</h2>
          </div>

          <Partners />
        </section>
      </main>
      <Footer />
    </div>
  )
}

