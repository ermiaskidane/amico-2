import Image from "next/image"

const partners = [
  {
    id: 1,
    name: "Partner 1",
    logo: "https://images.unsplash.com/photo-1563694983011-6f4d90358083?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Partner 2",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Partner 3",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Partner 4",
    logo: "https://images.unsplash.com/photo-1563694983011-6f4d90358083?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Partner 5",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Partner 6",
    logo: "https://images.unsplash.com/photo-1563694983011-6f4d90358083?q=80&w=200&auto=format&fit=crop",
  },
]

export function Partners() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
      {partners.map((partner) => (
        <div
          key={partner.id}
          className="relative h-12 w-24 md:h-16 md:w-32 opacity-70 hover:opacity-100 transition-opacity"
        >
          <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} fill className="object-contain" />
        </div>
      ))}
    </div>
  )
}

