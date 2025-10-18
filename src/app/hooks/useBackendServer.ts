import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function backendRequest(
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
  try {
    const config = {
      url: `${BASE_URL}${endpoint}`,
      method,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      data,
      ...options, // params, timeout, etc.
    };

    const res = await axios.request(config);
    return res.data;
  } catch (err: any) {
    // Podés lanzar el error directamente o manejarlo con más detalle
    throw new Error(err.response?.data?.message || err.message);
  }
}
