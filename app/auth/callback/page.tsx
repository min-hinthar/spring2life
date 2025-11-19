"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { completeOAuth } from "@/lib/auth"

const AuthCallbackPage = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    const params = new URLSearchParams(hash)
    const access_token = params.get("access_token")
    const refresh_token = params.get("refresh_token")

    if (!access_token || !refresh_token) {
      setError("Missing tokens from provider")
      return
    }

    completeOAuth({ access_token, refresh_token })
      .then(() => router.replace("/dashboard"))
      .catch((err) => {
        console.error(err)
        setError(err instanceof Error ? err.message : "Unable to finish sign in")
      })
  }, [router])

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#030712] text-white">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
        <p className="text-lg font-semibold">Completing your secure sign in…</p>
        {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
      </div>
    </main>
  )
}

export default AuthCallbackPage
