"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"

type Business = {
  id: number
  name: string
  description: string
  // ...otros campos
}

type BusinessContextType = {
  business: Business | null
  loading: boolean
  refreshBusiness: () => Promise<void>
}

const BusinessContext = createContext<BusinessContextType>({
  business: null,
  loading: false,
  refreshBusiness: async () => {},
})

export const BusinessProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchBusiness = async () => {
    console.log("Fetching business for user:", session?.user)
    if (!session?.user?.businessId) return
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/business`, {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      })
      const data = await res.json()
      setBusiness(data)
    } catch (err) {
      console.error("Error al obtener el negocio", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBusiness()
  }, [session])

  return (
    <BusinessContext.Provider value={{ business, loading, refreshBusiness: fetchBusiness }}>
      {children}
    </BusinessContext.Provider>
  )
}

export const useBusiness = () => useContext(BusinessContext)
