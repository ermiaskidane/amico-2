import { Navbar } from "@/components/navbar"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

type Props = {
  children: React.ReactNode
}

const CreatePropertyLayout = async({ children }: Props) => {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <div>
      <Navbar currentUser={session?.user}/>
      {children}
    </div>
  )
}

export default CreatePropertyLayout;