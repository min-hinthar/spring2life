"use client"

import { useEffect, useMemo, useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { signInWithEmail, signUpWithEmail } from "@/lib/auth"

const AuthForm = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const searchParams = useSearchParams()

  const redirectTo = useMemo(() => searchParams.get("redirect") || "/dashboard", [searchParams])

  useEffect(() => {
    setError(null)
  }, [mode])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    startTransition(async () => {
      try {
        if (mode === "signin") {
          await signInWithEmail({ email, password })
        } else {
          await signUpWithEmail({ email, password, fullName })
        }

        router.replace(redirectTo)
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : "Unable to authenticate")
      }
    })
  }

  const handleGoogle = () => {
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!baseUrl) {
      setError("Missing NEXT_PUBLIC_SUPABASE_URL")
      return
    }

    const redirectUrl = `${window.location.origin}/auth/callback`
    const url = `${baseUrl}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectUrl)}`
    window.location.href = url
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-green-200">Account</p>
          <h2 className="text-2xl font-semibold text-white">Sign {mode === "signin" ? "in" : "up"} for care</h2>
          <p className="text-sm text-white/70">Continue to your patient, provider, or admin workspace.</p>
        </div>
        <div className="flex gap-2 rounded-full bg-white/5 p-1 text-xs font-semibold text-white/70">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`rounded-full px-3 py-1 transition ${mode === "signin" ? "bg-green-500 text-[#0a1020]" : "hover:bg-white/10"}`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-full px-3 py-1 transition ${mode === "signup" ? "bg-green-500 text-[#0a1020]" : "hover:bg-white/10"}`}
          >
            Sign up
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {mode === "signup" && (
          <div className="space-y-2">
            <label className="text-sm text-white/70">Full name</label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-green-400 focus:outline-none"
              placeholder="Nandar"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm text-white/70">Email</label>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-green-400 focus:outline-none"
            placeholder="admin@test.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/70">Password</label>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-green-400 focus:outline-none"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            required
          />
        </div>

        {error && <p className="text-xs text-red-300">{error}</p>}

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            className="w-full rounded-2xl bg-green-500 px-4 py-3 font-semibold text-[#0a1020] shadow-lg transition hover:translate-y-[1px]"
            disabled={isPending}
          >
            {isPending ? "Processing..." : mode === "signin" ? "Sign in" : "Create account"}
          </button>
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 font-semibold text-white transition hover:border-green-400/60 hover:bg-white/10"
          >
            Continue with Google
          </button>
        </div>
      </form>
    </div>
  )
}

export default AuthForm
