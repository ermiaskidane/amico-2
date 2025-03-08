import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Bed, Bath, SquareIcon as SquareFeet, Heart, MapPin } from "lucide-react"
import { properties } from "@/lib/properties"

type FeaturedPropertiesProps = {
  Role: string | undefined
}

export function FeaturedProperties({Role} : FeaturedPropertiesProps) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Card
          key={property.id}
          className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-primary/10"
        >
          <div className="relative">
            <div className="absolute top-2 left-2 z-10 flex gap-2">
              <Badge variant={property.type === "For Sale" ? "default" : "secondary"}>{property.type}</Badge>
              {property.isNew && (
                <Badge variant="outline" className="bg-yellow-500 text-primary-foreground border-none">
                  New
                </Badge>
              )}
              {Role ? (
                <Link href="/create-new-property">
                  <Badge variant="default">update</Badge>
                </Link>
              ): (
                <></>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 rounded-full bg-background/80 backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity"
            >
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add to favorites</span>
            </Button>
            <Link href={`/properties/${property.id}`}>
              <div className="overflow-hidden h-[240px]">
                <Image
                  src={property.images[0] || "/placeholder.svg"}
                  alt={property.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                <div className="flex items-center text-muted-foreground text-sm mt-1">
                  <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                  <span className="line-clamp-1">{property.address}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">{property.price}</div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 text-sm">
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{property.beds} Beds</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.baths} Baths</span>
              </div>
              <div className="flex items-center">
                <SquareFeet className="h-4 w-4 mr-1" />
                <span>{property.sqft} sqft</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/properties/${property.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

