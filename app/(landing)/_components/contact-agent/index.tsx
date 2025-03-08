import { Button } from '@/components/ui/button'
import React from 'react'

const ContactAgent = () => {
  return (
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
  )
}

export default ContactAgent