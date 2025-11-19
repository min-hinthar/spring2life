"use server"

import { supabaseRequest } from "../supabase"
import { ProviderRecord } from "@/types/database"

const PROVIDERS_TABLE = "providers"

export const getProviders = async () => {
  const providers = await supabaseRequest<ProviderRecord[]>({
    path: PROVIDERS_TABLE,
    query: {
      select: "*",
      order: "seniority.desc",
    },
  })

  return providers
}
