import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Home, Star } from "lucide-react"

const Select = () => {
  return (
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
  )
}

export default Select