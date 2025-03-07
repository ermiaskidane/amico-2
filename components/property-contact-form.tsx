"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Mail, Phone, User } from "lucide-react"

interface PropertyContactFormProps {
  propertyId: number
  propertyTitle: string
}

export function PropertyContactForm({ propertyId, propertyTitle }: PropertyContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="p-6 border rounded-lg bg-muted/30">
        <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          Your inquiry about &quot;{propertyTitle}&quot; has been received. One of our agents will contact you shortly.
        </p>
        <Button className="mt-4 w-full" variant="outline" onClick={() => setIsSubmitted(false)}>
          Send Another Inquiry
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Interested in this property?</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="propertyId" value={propertyId} />

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Your Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input id="name" placeholder="Enter your name" className="pl-9" required />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input id="email" type="email" placeholder="Enter your email" className="pl-9" required />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input id="phone" placeholder="Enter your phone number" className="pl-9" required />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="date" className="text-sm font-medium">
            Preferred Visit Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input id="date" type="date" className="pl-9" />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <Textarea
            id="message"
            placeholder="I'm interested in this property and would like more information..."
            rows={4}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Inquiry"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By submitting this form, you agree to our privacy policy and terms of service.
        </p>
      </form>
    </div>
  )
}

