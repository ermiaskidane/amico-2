"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Building2, LogOut, Menu, Phone, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DropDown from "./global/drop-down"
import { useNavbar } from "@/hooks/navbar"
import { AgentSelectionModal } from "./global/agent-select-modal"


type NavbarProps = {
  currentUser: {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null | undefined,
  } | undefined
}

export function Navbar({currentUser}: NavbarProps) {
  const { 
    isOpen, 
    setIsOpen, 
    isAgentModalOpen,
    setIsAgentModalOpen,
    handleAgentSelect, 
    data, 
    UserInfo, 
    onLogout
  } = useNavbar()
  

  console.log("DDDD", currentUser, data)
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EstateEase</span>
          </Link>

          <NavigationMenu className="hidden md:flex ml-6">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Buy</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/properties"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">Featured Properties</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Explore our handpicked selection of premium properties available for purchase.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/properties/houses" title="Houses">
                      Find your perfect single-family home
                    </ListItem>
                    <ListItem href="/properties/condos" title="Condos">
                      Luxury condominiums in prime locations
                    </ListItem>
                    <ListItem href="/properties/new-developments" title="New Developments">
                      Brand new properties with modern amenities
                    </ListItem>
                    <ListItem href="/properties/luxury" title="Luxury Homes">
                      Exclusive high-end properties
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Rent</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/rentals/apartments" title="Apartments">
                      Find the perfect apartment for your lifestyle
                    </ListItem>
                    <ListItem href="/rentals/houses" title="Houses">
                      Spacious houses available for rent
                    </ListItem>
                    <ListItem href="/rentals/short-term" title="Short-term Rentals">
                      Flexible leasing options for temporary stays
                    </ListItem>
                    <ListItem href="/rentals/luxury" title="Luxury Rentals">
                      Premium properties with exclusive amenities
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Sell</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/sell/valuation" title="Property Valuation">
                      Get an accurate estimate of your property&apos;s worth
                    </ListItem>
                    <ListItem href="/sell/process" title="Selling Process">
                      Learn about our streamlined selling approach
                    </ListItem>
                    <ListItem href="/sell/marketing" title="Marketing Strategy">
                      How we showcase your property to potential buyers
                    </ListItem>
                    <ListItem href="/sell/tips" title="Seller Tips">
                      Expert advice to maximize your property&apos;s value
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex justify-between items-center gap-4 pr-2">
          <Button variant="ghost" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            (555) 123-4567
          </Button>
          {
            currentUser ? (
              <DropDown
              title={currentUser.name}
              trigger={
                <Avatar className="cursor-pointer">
                  <AvatarImage src={currentUser.image || undefined} alt="user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              }
              >
                {/* <h2 className="text-md pl-3 pb-2"></h2> */}
                <Button
                  onClick={onLogout}
                  variant="ghost"
                  className="flex gap-x-3 px-2 justify-start w-full"
                >
                  <LogOut />
                  Logout
                </Button>
              </DropDown>
            ) : (
              <Link href="/sign-in">
                Log in
              </Link>
            )
          }
          {UserInfo?.user?.role === "ADMIN" && (
            <Button 
              size="sm" 
              className="cursor-pointer" 
              onClick={() => setIsAgentModalOpen(true)}
            >
              Add Agent 
            </Button>
          )}
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-6 py-6">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <Building2 className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">EstateEase</span>
              </Link>
              <div className="grid gap-4">
                <h4 className="font-medium">Menu</h4>
                <div className="grid gap-2">
                  <Link
                    href="/properties"
                    className="flex items-center gap-2 text-muted-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    Buy Properties
                  </Link>
                  <Link
                    href="/rentals"
                    className="flex items-center gap-2 text-muted-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    Rent Properties
                  </Link>
                  <Link
                    href="/sell"
                    className="flex items-center gap-2 text-muted-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    Sell Your Property
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center gap-2 text-muted-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 text-muted-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="grid gap-2">
                <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                  <User className="h-4 w-4 mr-2" />
                  <Link href="/sign-in">
                    Log in
                  </Link>
                </Button>
                <Button 
                className="w-full" 
                onClick={() => {
                  setIsOpen(false)
                  setIsAgentModalOpen(true)
                }}>
                  Get Started
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <AgentSelectionModal
        isOpen={isAgentModalOpen}
        onClose={() => setIsAgentModalOpen(false)}
        onAgentSelect={handleAgentSelect}
      />
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string
  }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

