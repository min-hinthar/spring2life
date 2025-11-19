const buildHeaders = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      "Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file."
    )
  }

  return { url, key }
}

export type SupabaseQuery = Record<string, string | number | boolean | string[]>

type SupabaseRequestArgs = {
  method?: "GET" | "POST" | "PATCH" | "DELETE"
  path: string
  body?: Record<string, unknown>
  query?: SupabaseQuery
}

export const supabaseRequest = async <T>({ method = "GET", path, body, query }: SupabaseRequestArgs) => {
  const { url, key } = buildHeaders()
  const endpoint = new URL(`${url}/rest/v1/${path}`)

  if (query) {
    Object.entries(query).forEach(([param, value]) => {
      if (Array.isArray(value)) {
        value.forEach((entry) => endpoint.searchParams.append(param, entry))
      } else {
        endpoint.searchParams.set(param, String(value))
      }
    })
  }

  const response = await fetch(endpoint.toString(), {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  })

  const isJson = response.headers.get("content-type")?.includes("application/json")
  const payload = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const message = typeof payload === "string" ? payload : payload?.message
    throw new Error(message || "Supabase request failed")
  }

  return payload as T
}
