import { Buffer } from "node:buffer"

type SupabaseEnv = {
  url: string
  key: string
}

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Double-check your environment variables."
  )
}

const env: SupabaseEnv = {
  url: SUPABASE_URL,
  key: SUPABASE_SERVICE_ROLE_KEY,
}

const baseHeaders = {
  apikey: env.key,
  Authorization: `Bearer ${env.key}`,
}

export class SupabaseError extends Error {
  status: number
  code?: string
  details?: string
  hint?: string

  constructor(message: string, init: { status: number; code?: string; details?: string; hint?: string }) {
    super(message)
    this.name = "SupabaseError"
    this.status = init.status
    this.code = init.code
    this.details = init.details
    this.hint = init.hint
  }
}

const buildQuery = (params?: Record<string, string | undefined>) => {
  if (!params) return ""
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, value)
    }
  })

  const query = searchParams.toString()
  return query ? `?${query}` : ""
}

type SupabaseErrorPayload = {
  message?: string
  code?: string
  details?: string
  hint?: string
}

const supabaseRequest = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${env.url}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      ...baseHeaders,
      ...(init?.headers ?? {}),
    },
  })

  if (!response.ok) {
    let body: SupabaseErrorPayload | null = null
    try {
      body = (await response.json()) as SupabaseErrorPayload
    } catch {
      body = { message: response.statusText }
    }

    throw new SupabaseError(body?.message ?? "Supabase request failed", {
      status: response.status,
      code: body?.code,
      details: body?.details,
      hint: body?.hint,
    })
  }

  if (response.status === 204) {
    return undefined as T
  }

  const contentType = response.headers.get("content-type") ?? ""

  if (contentType.includes("application/json")) {
    return (await response.json()) as T
  }

  return (await response.text()) as T
}

export const insertRow = async <T>(table: string, payload: unknown) => {
  return supabaseRequest<T[]>(`/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  })
}

export const selectRows = async <T>(table: string, params?: Record<string, string | undefined>) => {
  return supabaseRequest<T[]>(`/rest/v1/${table}${buildQuery(params)}`)
}

export const updateRows = async <T>(table: string, params: Record<string, string>, payload: unknown) => {
  return supabaseRequest<T[]>(`/rest/v1/${table}${buildQuery(params)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  })
}

export const uploadToStorage = async (
  bucket: string,
  path: string,
  body: Buffer,
  contentType?: string
) => {
  return supabaseRequest<{ Key: string }>(`/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": contentType ?? "application/octet-stream",
      "x-upsert": "false",
    },
    body,
  })
}

export const getPublicFileUrl = (bucket: string, path: string) => {
  return `${env.url}/storage/v1/object/public/${bucket}/${path}`
}
