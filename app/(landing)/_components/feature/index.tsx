"use client";

import { FeaturedProperties } from '@/components/featured-properties'
import { Button } from '@/components/ui/button'
import { useFeaturePage } from '@/hooks/feature';
import Link from 'next/link';


const Feature = () => {
 const { data, property } = useFeaturePage()

 console.log("@@@@@@@@@", data, property)
  return (
    <section className="py-16 container mx-auto px-4">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Featured Properties</h2>
        <p className="text-muted-foreground mt-2">Explore our handpicked selection of premium properties</p>
      </div>
      <div className="flex mt-4 md:mt-0">
      {(data?.user?.role === "ADMIN" || data?.user?.role === "AGENT") && (
        <Button>
          <Link href="/create-new-property">Create</Link>
        </Button>
      )}
      <Button variant="outline" className="mx-2">
        View All Properties
      </Button>
      <Button>New Listings</Button>
      </div>
    </div>

    <FeaturedProperties  Role={data?.user?.role}/>
  </section>
  )
}

export default Feature