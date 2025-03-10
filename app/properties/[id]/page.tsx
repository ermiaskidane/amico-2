import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bed,
  Bath,
  SquareIcon as SquareFeet,
  Heart,
  MapPin,
  Calendar,
  Home,
  Car,
  Trees,
  Wifi,
  Thermometer,
  ShowerHead,
  ChevronLeft,
} from "lucide-react"
import { PropertyGallery } from "@/components/property-gallery"
import { PropertyContactForm } from "@/components/property-contact-form"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getPropertyById } from "@/lib/properties"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

type PageParams = {
  id: string
}

export default async function PropertyDetailPage({ params }: { params: PageParams }) {
  const property = await getPropertyById(Number.parseInt(params.id));

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!property) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar currentUser={session?.user}/>
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Property Not Found</h1>
            <p className="mt-4 text-muted-foreground">
              The property you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Button asChild className="mt-8">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar currentUser={session?.user}/>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to listings
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={property.type === "For Sale" ? "default" : "secondary"}>{property.type}</Badge>
                      {property.isNew && (
                        <Badge variant="outline" className="bg-yellow-500 text-primary-foreground border-none">
                          New
                        </Badge>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold">{property.title}</h1>
                    <div className="flex items-center text-muted-foreground mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.address}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{property.price}</div>
                    <div className="text-muted-foreground text-sm mt-1">
                      {property.type === "For Sale" ? "Purchase Price" : "Monthly Rent"}
                    </div>
                  </div>
                </div>
              </div>

              <PropertyGallery images={property.images} />

              <div className="flex items-center justify-between bg-muted/30 rounded-lg p-4 mt-6">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <div className="font-medium">{property.beds}</div>
                    <div className="text-xs text-muted-foreground">Bedrooms</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <div className="font-medium">{property.baths}</div>
                    <div className="text-xs text-muted-foreground">Bathrooms</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <SquareFeet className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <div className="font-medium">{property.sqft}</div>
                    <div className="text-xs text-muted-foreground">Square Feet</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <div className="font-medium">{property.yearBuilt}</div>
                    <div className="text-xs text-muted-foreground">Year Built</div>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="details" className="mt-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-4">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold mb-4">Property Description</h3>
                    <p className="text-muted-foreground mb-4">{property.description}</p>
                    <p className="text-muted-foreground mb-4">
                      This exceptional property offers a perfect blend of comfort and luxury. The spacious layout
                      provides ample room for both relaxation and entertainment, while the high-end finishes throughout
                      add a touch of sophistication.
                    </p>
                    <p className="text-muted-foreground">
                      The neighborhood offers easy access to local amenities, including shopping centers, restaurants,
                      parks, and excellent schools, making it an ideal location for families and professionals alike.
                    </p>

                    <Separator className="my-6" />

                    <h3 className="text-xl font-semibold mb-4">Property Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <div className="w-40 text-muted-foreground">Property ID:</div>
                        <div className="font-medium">#{property.id}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-40 text-muted-foreground">Property Type:</div>
                        <div className="font-medium">{property.propertyType}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-40 text-muted-foreground">Bedrooms:</div>
                        <div className="font-medium">{property.beds}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-40 text-muted-foreground">Bathrooms:</div>
                        <div className="font-medium">{property.baths}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-40 text-muted-foreground">Square Feet:</div>
                        <div className="font-medium">{property.sqft}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-40 text-muted-foreground">Year Built:</div>
                        <div className="font-medium">{property.yearBuilt}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-40 text-muted-foreground">Garage:</div>
                        <div className="font-medium">{property.garage} Cars</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-40 text-muted-foreground">Lot Size:</div>
                        <div className="font-medium">{property.lotSize} sqft</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="features" className="mt-4">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold mb-4">Property Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-6" />

                    <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center p-3 rounded-lg border">
                        <Home className="h-5 w-5 mr-3 text-primary" />
                        <span>Central Heating</span>
                      </div>
                      <div className="flex items-center p-3 rounded-lg border">
                        <Car className="h-5 w-5 mr-3 text-primary" />
                        <span>Garage</span>
                      </div>
                      <div className="flex items-center p-3 rounded-lg border">
                        <Trees className="h-5 w-5 mr-3 text-primary" />
                        <span>Garden</span>
                      </div>
                      <div className="flex items-center p-3 rounded-lg border">
                        <Wifi className="h-5 w-5 mr-3 text-primary" />
                        <span>Internet</span>
                      </div>
                      <div className="flex items-center p-3 rounded-lg border">
                        <Thermometer className="h-5 w-5 mr-3 text-primary" />
                        <span>Air Conditioning</span>
                      </div>
                      <div className="flex items-center p-3 rounded-lg border">
                        <ShowerHead className="h-5 w-5 mr-3 text-primary" />
                        <span>Modern Bathroom</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="location" className="mt-4">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold mb-4">Location</h3>
                    <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
                      {/* <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215151997078!2d-73.98784492426285!3d40.75798657138946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1710936284459!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe> */}
                      <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2422.3421868664195!2d-1.156060823116735!3d52.61766017208696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487760ceaff8f1e5%3A0x98c72f53bd9cee01!2s108%20Evesham%20Rd%2C%20Leicester%20LE3%202BD!5e0!3m2!1sen!2suk!4v1741283583168!5m2!1sen!2suk"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-lg font-semibold mb-3">Nearby Amenities</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium mb-2">Education</h5>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Lincoln Elementary School (0.5 miles)</li>
                            <li>Washington High School (1.2 miles)</li>
                            <li>City University (3.5 miles)</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Health</h5>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Community Medical Center (1.0 mile)</li>
                            <li>Wellness Pharmacy (0.7 miles)</li>
                            <li>Central Hospital (2.8 miles)</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Shopping</h5>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Riverside Mall (1.5 miles)</li>
                            <li>Downtown Shopping District (0.8 miles)</li>
                            <li>Grocery Supermarket (0.3 miles)</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Transportation</h5>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Central Station (1.1 miles)</li>
                            <li>Bus Stop (0.2 miles)</li>
                            <li>International Airport (12 miles)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <PropertyContactForm propertyId={property.id} propertyTitle={property.title} />

                <div className="mt-6 p-6 border rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Property Agent</h3>
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
                        alt="Agent"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">David Anderson</h4>
                      <p className="text-sm text-muted-foreground">Senior Real Estate Agent</p>
                      <p className="text-sm text-primary mt-1">View Profile</p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <MapPin className="mr-2 h-4 w-4" />
                      Schedule a Tour
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Heart className="mr-2 h-4 w-4" />
                      Add to Favorites
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

