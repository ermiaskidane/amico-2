import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"
import { onGetUserInfo } from "@/actions/auth"
import Hero from "./_components/hero"
import Feature from "./_components/feature"
import Select from "./_components/select"
import ContactAgent from "./_components/contact-agent"
import Partner from "./_components/partner"
import TestimonialsSection from "./_components/testimonal"

export default async function HomePage() {
  const client = new QueryClient()

  await client.prefetchQuery({
    queryKey: ["user-info"],
    queryFn: () => onGetUserInfo()
  })

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero/>
        <Feature/>
        <Select/>
        <TestimonialsSection/>
        <ContactAgent/>
        <Partner/>
      </main>
      <Footer />
      </div>
    </HydrationBoundary>
  )
}

