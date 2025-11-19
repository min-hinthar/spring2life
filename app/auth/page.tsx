import AuthForm from "@/components/forms/AuthForm"

const AuthPage = ({ searchParams }: { searchParams: { redirect?: string } }) => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#061021] via-[#0b162a] to-[#0f2136] text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16 lg:px-12">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-green-200">Secure entry</p>
          <h1 className="text-4xl font-semibold leading-tight">Sign in or sign up to coordinate care.</h1>
          <p className="text-white/70">
            Choose Google, password, or email to reach the admin portal, patient dashboard, or provider workspace.
          </p>
        </div>

        <AuthForm key={searchParams.redirect} />

        <section className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:grid-cols-3">
          {[
            {
              title: "Patients",
              body: "Register a story-rich profile, book multiple appointment types, and track statuses.",
            },
            {
              title: "Providers",
              body: "See referrals, upcoming sessions, and patient communication preferences.",
            },
            {
              title: "Admins",
              body: "Confirm, cancel, or reschedule from a calming control room with live data.",
            },
          ].map((item) => (
            <div key={item.title} className="space-y-2 rounded-2xl bg-white/5 p-4 shadow-xl">
              <p className="text-lg font-semibold">{item.title}</p>
              <p className="text-sm text-white/70">{item.body}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}

export default AuthPage
