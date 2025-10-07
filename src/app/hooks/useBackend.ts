import { useState } from "react";
import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export function useBackend() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function request(
    endpoint: string,
    {
      method = "GET",
      token = null,
      data = null,
      headers = {},
      ...options
    }: {
      method?: string;
      token?: string | null;
      data?: any;
      headers?: Record<string, string>;
      [key: string]: any;
    } = {}
  ) {
    setLoading(true);
    setError(null);
    try {
      const config = {
        url: `${BASE_URL}${endpoint}`,
        method,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...headers,
        },
        data,
        ...options, // permite enviar otras opciones como timeout, params, etc.
      };

      const res = await axios.request(config);
      return res.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { request, loading, error };
}
