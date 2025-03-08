import { Testimonials } from '@/components/testimonials'
import React from 'react'

const TestimonialsSection = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold tracking-tight">What Our Clients Say</h2>
        <p className="text-muted-foreground mt-2">
          Hear from homeowners and buyers who found success with our services
        </p>
      </div>

      <Testimonials />
    </section>
  )
}

export default TestimonialsSection