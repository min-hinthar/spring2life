import Link from "next/link"

import { getSession, signOut } from "@/lib/auth"

const NavBar = async () => {
  const session = await getSession()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a1020]/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-12">
        <Link href="/" className="text-lg font-semibold text-white">
          Spring2Life
        </Link>
        <nav className="flex items-center gap-3 text-sm text-white/70">
          <Link href="/providers" className="rounded-full px-3 py-1 hover:bg-white/5">
            Providers
          </Link>
          <Link href="/dashboard" className="rounded-full px-3 py-1 hover:bg-white/5">
            Dashboard
          </Link>
          <Link href="/admin" className="rounded-full px-3 py-1 hover:bg-white/5">
            Admin
          </Link>
          {session ? (
            <form action={signOut}>
              <button className="rounded-full bg-white/10 px-4 py-2 text-white transition hover:bg-white/20" type="submit">
                Sign out
              </button>
            </form>
          ) : (
            <Link href="/auth" className="rounded-full bg-green-500 px-4 py-2 font-semibold text-[#0a1020] shadow-lg">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default NavBar
