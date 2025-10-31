"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useBackend } from "../hooks/useBackend";
import { Loading } from "../components/Loading";

type UserWithAccessToken = {
  id?: string | number;
  name?: string;
  email?: string;
  businessId?: number;
  accessToken?: string;
  // ...otros campos de usuario
};

type Business = {
  id: number;
  name: string;
  description: string;
  industry: string;
  // ...otros campos
};

interface CategoryProps {
  active: boolean;
  description?: string;
  id: number;
  name: string;
}

type BusinessContextType = {
  business: Business | null;
  loading: boolean;
  refreshBusiness: () => Promise<void>;
  getBusinessProp: (prop: keyof Business) => string | number | undefined;
  categories: CategoryProps[];
  setCategories: (categories: CategoryProps[]) => void;
  getCategories: () => Promise<void>;
};


const BusinessContext = createContext<BusinessContextType>({
  business: null,
  loading: false,
  refreshBusiness: async () => {},
  getBusinessProp: () => "",
  categories: [],
  setCategories: () => {},
  getCategories: async () => {}
});

export const BusinessProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const token = session?.user?.accessToken;

  const { request, error } = useBackend();

  const fetchBusiness = async () => {
    if (!session?.user?.businessId) return;

    console.log("Fetching business for user:", session?.user?.businessId);
    // console.log("Using access token:", session?.user?.accessToken);

    setLoading(true);
    try {
      const data = await request("/business/me", {
        method: "GET",
        token: session.user.accessToken,
      });
      setBusiness(data);
      console.log("Fetched business data:", data);
    } catch (err) {
      console.error("Error al obtener el negocio", err);
    } finally {
      setLoading(false);
    }
  };

  const getBusinessProp = (prop: keyof Business) => {
    return business ? business[prop] : "";
  };


  const getCategories = async () => {
    if (!token) return;
    try {
      const data = await request("/categories", { token });
      setCategories(data);
    }
    catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchBusiness();
    getCategories();

  }, []);
  // session

 
  const value = {
    business,
    loading,
    refreshBusiness: fetchBusiness,
    getBusinessProp: (prop: keyof Business) => getBusinessProp(prop),
    categories, setCategories, getCategories
  };

  if (loading) return <Loading />;

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => useContext(BusinessContext);
