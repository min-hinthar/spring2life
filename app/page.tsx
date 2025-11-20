import Link from "next/link"
import { CalendarClock, CheckCircle2, Lock, ShieldCheck, Sparkles } from "lucide-react"

import AppointmentForm from "@/components/forms/AppointmentForm"
import AuthForm from "@/components/forms/AuthForm"
import RegisterForm from "@/components/forms/RegisterForm"
import { getDashboardAppointments } from "@/lib/actions/appointment.actions"
import { getProviders } from "@/lib/actions/provider.actions"
import { getSession } from "@/lib/auth"

const statsCopy = [
  { label: "Pending", color: "bg-amber-400/20 text-amber-100", dot: "bg-amber-400" },
  { label: "Confirmed", color: "bg-emerald-400/20 text-emerald-100", dot: "bg-emerald-400" },
  { label: "Cancelled", color: "bg-rose-400/20 text-rose-100", dot: "bg-rose-400" },
  { label: "Rescheduled", color: "bg-blue-400/20 text-blue-100", dot: "bg-blue-400" },
]

const Home = async () => {
  const session = await getSession()
  const { appointments, stats } = await getDashboardAppointments()
  const providers = await getProviders()

  const latestAppointments = appointments.slice(0, 4)

  return (
    <main className="min-h-screen text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-14 lg:px-10 lg:py-16">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/5 to-emerald-400/10 p-8 shadow-2xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Supabase secure
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">A calm control center for mental health appointments.</h1>
              <p className="text-lg text-white/70">
                Spring2Life blends Supabase authentication with patient-friendly scheduling, so coordinators, providers, and patients share a single, secure workspace.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/auth"
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-[1px]"
                >
                  {session ? "Go to workspace" : "Sign in / Create account"}
                </Link>
                <Link
                  href="/admin"
                  className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-300/70 hover:text-emerald-50"
                >
                  Review requests
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <ShieldCheck className="h-5 w-5 text-emerald-300" />
                  <span>Role-aware access from Supabase</span>
                </div>
                <p className="mt-3 text-lg font-semibold text-white">{session ? session.email : "Private workspace"}</p>
                <p className="text-xs text-white/60">Session cookies and RLS keep patient data contained.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <CalendarClock className="h-5 w-5 text-sky-300" />
                  <span>Live scheduling pipeline</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm font-semibold">
                  {statsCopy.map((item) => (
                    <div key={item.label} className={`flex items-center justify-between rounded-xl px-3 py-2 ${item.color}`}>
                      <span className={`h-2 w-2 rounded-full ${item.dot}`} />
                      <span>{stats[item.label.toLowerCase() as keyof typeof stats] || 0}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-emerald-200">Supabase sign-on</p>
                  <h2 className="text-2xl font-semibold">Authenticate and route every role</h2>
                </div>
                <Sparkles className="h-8 w-8 text-emerald-300" />
              </div>
              <p className="mt-2 text-sm text-white/70">Use Supabase email, password, or Google to land in the right dashboard instantly.</p>
              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                <AuthForm />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Encrypted auth tokens", "Row level security", "Audit-friendly event log", "Google OAuth ready"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white/80">
                  <Lock className="h-4 w-4 text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 lg:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Register patients</p>
            <h3 className="text-3xl font-semibold">Capture the story once</h3>
            <p className="text-sm text-white/70">
              Build a patient profile with communication preferences, emergency contacts, and language needs before scheduling.
            </p>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
              <RegisterForm />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Schedule care</p>
            <h3 className="text-3xl font-semibold">Book focused sessions</h3>
            <p className="text-sm text-white/70">Lock in a provider, specialty, and focus area with real-time Supabase updates.</p>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
              <AppointmentForm />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-200">Live activity</p>
                <h3 className="text-3xl font-semibold">Latest appointment requests</h3>
                <p className="text-sm text-white/70">A quick look at what patients are requesting across the week.</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-emerald-300" />
            </div>

            <div className="mt-6 space-y-4">
              {latestAppointments.map((appointment) => (
                <div key={appointment.id} className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-900/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold">{appointment.provider}</p>
                    <p className="text-sm text-white/60">{appointment.specialty} • {appointment.focus_area}</p>
                    <p className="text-xs text-white/50">{new Date(appointment.scheduled_at).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/60">{appointment.patients?.full_name}</span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.12em] text-white">
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}

              {latestAppointments.length === 0 && (
                <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-center text-sm text-white/60">
                  No appointments yet. Book a session to see it appear instantly.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-200">Provider directory</p>
                <h3 className="text-3xl font-semibold">Curated care partners</h3>
                <p className="text-sm text-white/70">Role-secured previews of who is available for the next referral.</p>
              </div>
              <CalendarClock className="h-8 w-8 text-sky-300" />
            </div>

            <div className="mt-6 grid gap-3">
              {providers.slice(0, 5).map((provider) => (
                <div key={provider.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                  <div>
                    <p className="font-semibold">{provider.full_name}</p>
                    <p className="text-sm text-white/60">{provider.specialty}</p>
                    <p className="text-xs text-white/50">Modalities: {provider.modalities?.join(", ") || "Conversation"}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${provider.accepts_new_clients ? "bg-emerald-400/20 text-emerald-100" : "bg-slate-800 text-white/60"}`}>
                    {provider.accepts_new_clients ? "Accepting" : "Waitlist"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Home
