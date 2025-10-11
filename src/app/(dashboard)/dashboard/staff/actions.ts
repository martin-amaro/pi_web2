"use server";

import { revalidatePath } from "next/cache";
import { backendRequest } from "@/app/hooks/useBackendServer";
import { auth } from "@/auth";

export async function createUserAction(data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  const session = await auth();

  await backendRequest("/business/create", {
    method: "POST",
    token: session?.user?.accessToken,
    data,
  });

  // Esto vuelve a ejecutar el loader y muestra el skeleton
  revalidatePath("/business/users");
}
