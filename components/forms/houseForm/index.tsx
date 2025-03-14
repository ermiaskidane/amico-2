"use client"

import { Check, Trash2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { usePropertycreate } from "@/hooks/feature"
import { agentSpecialties, amenitiesData, availableFeatures, iconMap } from "@/constants/availableFeatures"
import { UploadButton } from "@/lib/uploadthing"
import { toast } from "sonner"
import { PropertyType } from '@prisma/client';
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"


export default function PropertyForm() {
  const { oncreateProperty, form, open, setOpen, selectedAgent, Agents, setSelectedAgent} = usePropertycreate()
  
  console.log("33333", Agents, selectedAgent)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Property Details</h1>
      <Form {...form}>
        <form onSubmit={oncreateProperty} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter property title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter property address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:col-span-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter state" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter zip code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="$0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={PropertyType.FOR_SALE}>For Sale</SelectItem>
                        <SelectItem value={PropertyType.FOR_RENT}>For Rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          {/* Property Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Property Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="beds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="baths"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sqft"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Square Feet</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="House">House</SelectItem>
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="Condo">Condo</SelectItem>
                        <SelectItem value="Villa">Villa</SelectItem>
                        <SelectItem value="Townhouse">Townhouse</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearBuilt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year Built</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="garage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Garage Spaces</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lotSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lot Size (sq ft)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isNew"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>New Property</FormLabel>
                      <FormDescription>Mark this property as newly listed</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Description</h2>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the property..." className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          {/* Features */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Features</h2>
            <FormField
              control={form.control}
              name="features"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Property Features</FormLabel>
                    <FormDescription>Select all the features that apply to this property.</FormDescription>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableFeatures.map((feature) => (
                      <FormField
                        key={feature}
                        control={form.control}
                        name="features"
                        render={({ field }) => {
                          return (
                            <FormItem key={feature} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(feature)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, feature])
                                      : field.onChange(field.value?.filter((value) => value !== feature))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{feature}</FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          {/* Amenities */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Amenities</h2>
            <FormField
              control={form.control}
              name="amenities"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Property Amenities</FormLabel>
                    <FormDescription>Select all the amenities that apply to this property.</FormDescription>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {amenitiesData.map((amenity) => {
                      const IconComponent = iconMap[amenity.icon as keyof typeof iconMap]
                      return (
                        <FormField
                          key={amenity.name}
                          control={form.control}
                          name="amenities"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={amenity.name}
                                className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(amenity.name)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, amenity.name])
                                        : field.onChange(field.value?.filter((value) => value !== amenity.name))
                                    }}
                                  />
                                </FormControl>
                                <div className="flex items-center space-x-2">
                                  {IconComponent && <IconComponent className="h-5 w-5 text-muted-foreground" />}
                                  <FormLabel className="font-normal">{amenity.name}</FormLabel>
                                </div>
                              </FormItem>
                            )
                          }}
                        />
                      )
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            
          <Separator />

          {/* Agent Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Agent Information</h2>

            {/* Agent Selector */}
            <FormField
              control={form.control}
              name="agentId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Select Agent</FormLabel>
                  <FormDescription>Choose the agent responsible for this property listing</FormDescription>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={selectedAgent?.user?.image || ""} alt={selectedAgent?.user?.name} />
                              <AvatarFallback>
                                {selectedAgent?.user?.name
                                  ?.split(" ")
                                  .map((n) => n[0])
                                  .join("") || "NA"}
                              </AvatarFallback>
                            </Avatar>
                            {selectedAgent?.user?.name || "Select an agent"}
                          </div>
                          <User className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search agents..." />
                        <CommandEmpty>No agent found.</CommandEmpty>
                        <CommandList>
                          <ScrollArea className="h-72">
                            <CommandGroup>
                              {Agents?.allAgents?.map((agent) => (
                                <CommandItem
                                  key={agent.id}
                                  value={agent.id}
                                  onSelect={() => {
                                    form.setValue("agentId", agent.id)
                                    setSelectedAgent(agent)
                                    setOpen(false)
                                  }}
                                  className="flex items-center gap-2 py-2"
                                >
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={agent.user.image || ""} alt={agent.user.name} />
                                    <AvatarFallback>
                                      {agent.user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex flex-col">
                                    <span className="font-medium">{agent.user.name}</span>
                                    <span className="text-xs text-muted-foreground">{agent.title}</span>
                                  </div>
                                  <Check
                                    className={`ml-auto h-4 w-4 ${
                                      agent.id === field.value ? "opacity-100" : "opacity-0"
                                    }`}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </ScrollArea>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Selected Agent Details */}
            {selectedAgent && (
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={selectedAgent.user.image || ""} alt={selectedAgent.user.name} />
                        <AvatarFallback>
                          {selectedAgent.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <p className="text-sm font-medium">Contact</p>
                        <p className="text-sm">{selectedAgent.user.email}</p>
                        <p className="text-sm">{selectedAgent.user.phone}</p>
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">{selectedAgent.user.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedAgent.title}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">License ID</p>
                          <p className="text-sm">{selectedAgent.licenseId || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Years Active</p>
                          <p className="text-sm">{selectedAgent.yearsActive}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium">Bio</p>
                        <p className="text-sm">{selectedAgent.bio || "No bio available"}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium">Specialties</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedAgent.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="px-2 py-1">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>


          <Separator />

          {/* Images */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Property Images</h2>
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormDescription>Upload or provide URLs for property images.</FormDescription>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                    {field.value?.map((image, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-0 relative">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Property image ${index + 1}`}
                            className="w-full h-48 object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              const newImages = [...field.value];
                              newImages.splice(index, 1);
                              field.onChange(newImages);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                    <Card className="border-dashed border-2 flex items-center justify-center h-48">
                      <CardContent className="p-4 text-center">
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            // Add the uploaded image URL(s) to the form
                            const imageUrls = res.map(file => file.ufsUrl);
                            field.onChange([...field.value, ...imageUrls]);
                            console.log("Files: ", res);
                            toast("Success",{
                              description: "Upload Completed"
                            });
                          }}
                          onUploadError={(error) => {
                            console.log("::::", error.message);
                            toast("Error",{
                              description: error.message,
                            });
                          }}
                        />
                      </CardContent>
                    </Card>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <div className="space-y-6">
            <h2 className="text-xl font-semibold">Property Images</h2>
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormDescription>Upload or provide URLs for property images.</FormDescription>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                    {field.value?.map((image, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-0 relative">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Property image ${index + 1}`}
                            className="w-full h-48 object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              const newImages = [...field.value]
                              newImages.splice(index, 1)
                              field.onChange(newImages)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                    <Card className="border-dashed border-2 flex items-center justify-center h-48">
                      <CardContent className="p-4 text-center">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            const url = prompt("Enter image URL")
                            if (url) {
                              field.onChange([...field.value, url])
                            }
                          }}
                        >
                          Add Image URL
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              console.log("::::", error.message)
              toast("Error", {
                description: error.message
              })
              // alert(`ERROR! ${error.message}`);
            }}
          /> */}


          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Save Property</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}




{/* <div className="space-y-6">
            <h2 className="text-xl font-semibold">Agent Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Name</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Agent" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {userAgents?.data?.map((agent) =>(
                          <SelectItem value={agent.name}>{agent.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agent.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter agent title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agent.licenseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter license ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agent.yearsActive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years Active</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter years of experience" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agent.bio"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Agent Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter agent bio" className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agent.specialties"
                render={() => (
                  <FormItem className="md:col-span-2">
                    <div className="mb-4">
                      <FormLabel>Agent Specialties</FormLabel>
                      <FormDescription>Select all specialties that apply to this agent.</FormDescription>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {form.getValues("agent.specialties")?.map((specialty, index) => (
                          <Badge key={index} className="flex items-center gap-1 px-3 py-1">
                            {specialty}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 rounded-full"
                              onClick={() => {
                                const currentSpecialties = form.getValues("agent.specialties") || []
                                const newSpecialties = currentSpecialties.filter((s) => s !== specialty)
                                form.setValue("agent.specialties", newSpecialties)
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                              <span className="sr-only">Remove {specialty}</span>
                            </Button>
                          </Badge>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {agentSpecialties.map((specialty) => (
                          <FormField
                            key={specialty}
                            control={form.control}
                            name="agent.specialties"
                            render={({ field }) => {
                              return (
                                <FormItem key={specialty} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(specialty)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, specialty])
                                          : field.onChange(field.value?.filter((value) => value !== specialty))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{specialty}</FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div> */}