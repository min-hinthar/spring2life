import Link from "next/link"

import { getSession, signOut } from "@/lib/auth"

const NavBar = async () => {
  const session = await getSession()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="text-lg font-semibold text-white">
          Spring2Life
        </Link>
        <nav className="flex items-center gap-2 text-sm text-white/70">
          {[{ href: "/dashboard", label: "Workspace" }, { href: "/providers", label: "Directory" }, { href: "/admin", label: "Admin" }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <div className="ml-3 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs uppercase tracking-[0.15em] text-white/60">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Supabase
          </div>

          {session ? (
            <form action={signOut}>
              <button
                className="rounded-full bg-emerald-400 px-4 py-2 font-semibold text-slate-950 shadow-lg transition hover:-translate-y-[1px]"
                type="submit"
              >
                Sign out
              </button>
            </form>
          ) : (
            <Link
              href="/auth"
              className="rounded-full bg-white px-4 py-2 font-semibold text-slate-900 shadow-lg transition hover:-translate-y-[1px]"
            >
              Launch app
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default NavBar
