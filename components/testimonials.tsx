import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner",
    content:
      "Working with EstateEase was a dream come true. They helped me find the perfect home for my family in just two weeks. The process was smooth and stress-free.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "First-time Buyer",
    content:
      "As a first-time homebuyer, I was nervous about the process. The team at EstateEase guided me through every step and found me a beautiful condo within my budget.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Property Seller",
    content:
      "I sold my house through EstateEase and got more than my asking price! Their marketing strategy and professional photography made all the difference.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
  },
]

export function Testimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <Card
          key={testimonial.id}
          className="bg-background/60 backdrop-blur-sm border-primary/10 shadow-md hover:shadow-lg transition-all"
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                />
              ))}
            </div>
            <p className="text-muted-foreground">{testimonial.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

