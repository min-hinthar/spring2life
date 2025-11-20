"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { supabaseAuthRequest } from "./supabase-auth"
import { supabaseRequest } from "./supabase"

const PROFILE_TABLE = "profiles"

const setSessionCookies = (access_token: string, refresh_token: string, email?: string, role?: string) => {
  const cookieStore = cookies()
  cookieStore.set("sb-access-token", access_token, { httpOnly: true, path: "/", secure: true })
  cookieStore.set("sb-refresh-token", refresh_token, { httpOnly: true, path: "/", secure: true })

  if (email) {
    cookieStore.set("sb-email", email, { path: "/" })
  }

  if (role) {
    cookieStore.set("sb-role", role, { path: "/" })
  }
}

export const signUpWithEmail = async (payload: { email: string; password: string; fullName?: string }) => {
  const data = await supabaseAuthRequest<{ access_token: string; refresh_token: string; user: { email: string } }>({
    path: "signup",
    body: {
      email: payload.email,
      password: payload.password,
      data: { full_name: payload.fullName || payload.email },
    },
  })

  const role = await resolveProfileRole(payload.email)
  setSessionCookies(data.access_token, data.refresh_token, payload.email, role)
  return data
}

export const signInWithEmail = async (payload: { email: string; password: string }) => {
  const data = await supabaseAuthRequest<{ access_token: string; refresh_token: string; user: { email: string } }>({
    path: "token?grant_type=password",
    body: { email: payload.email, password: payload.password },
  })

  const role = await resolveProfileRole(payload.email)
  setSessionCookies(data.access_token, data.refresh_token, payload.email, role)
  return data
}

export const completeOAuth = async ({ access_token, refresh_token }: { access_token: string; refresh_token: string }) => {
  const user = await supabaseAuthRequest<{ user: { email: string } }>({ path: "user", method: "GET", accessToken: access_token })
  const role = await resolveProfileRole(user.user.email)
  setSessionCookies(access_token, refresh_token, user.user.email, role)
}

export const signOut = async () => {
  const cookieStore = cookies()
  cookieStore.delete("sb-access-token")
  cookieStore.delete("sb-refresh-token")
  cookieStore.delete("sb-role")
  cookieStore.delete("sb-email")
  redirect("/auth")
}

export const getSession = async () => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get("sb-access-token")?.value
  const email = cookieStore.get("sb-email")?.value
  const role = cookieStore.get("sb-role")?.value || "patient"

  return accessToken ? { accessToken, email, role } : null
}

export const requireSession = async () => {
  const session = await getSession()
  if (!session) redirect("/auth")
  return session
}

export const resolveProfileRole = async (email: string) => {
  const adminEmails = process.env.ADMIN_EMAILS?.split(",").map((entry) => entry.trim().toLowerCase()) || []
  if (adminEmails.includes(email.toLowerCase())) return "admin"

  const [profile] = await supabaseRequest<[{ role: string }] | []>({
    path: PROFILE_TABLE,
    query: {
      select: "role",
      email: `eq.${email.toLowerCase()}`,
    },
  })

  if (profile && "role" in profile) {
    return profile.role
  }

  return "patient"
}
