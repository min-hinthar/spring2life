const buildAuthHeaders = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error("Supabase auth environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.")
  }

  return { url, key }
}

type AuthRequestArgs = {
  path: string
  method?: "GET" | "POST" | "DELETE"
  body?: Record<string, unknown>
  accessToken?: string
}

export const supabaseAuthRequest = async <T>({ path, method = "POST", body, accessToken }: AuthRequestArgs) => {
  const { url, key } = buildAuthHeaders()
  const response = await fetch(`${url}/auth/v1/${path}`, {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${accessToken || key}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  })

  const isJson = response.headers.get("content-type")?.includes("application/json")
  const payload = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const message = typeof payload === "string" ? payload : payload?.error_description || payload?.error
    throw new Error(message || "Supabase auth request failed")
  }

  return payload as T
}
