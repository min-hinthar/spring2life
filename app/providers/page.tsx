import { getProviders } from "@/lib/actions/provider.actions"
import { requireSession } from "@/lib/auth"

const ProvidersPage = async () => {
  await requireSession()
  const providers = await getProviders()

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#030712] via-[#0c1628] to-[#0e1f35] text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 lg:px-12">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-green-200">Provider directory</p>
          <h1 className="text-4xl font-semibold">Find the right therapist or prescriber</h1>
          <p className="text-white/70">Match with experts by specialty, modality, and availability.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {providers.map((provider) => (
            <div key={provider.id} className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">{provider.full_name}</p>
                  <p className="text-sm text-green-200">{provider.specialty}</p>
                </div>
                <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-200">
                  {provider.accepts_new_clients ? "Accepting" : "Waitlist"}
                </span>
              </div>
              <p className="text-sm text-white/70">{provider.bio}</p>
              <div className="flex flex-wrap gap-2 text-xs text-white/70">
                {provider.modalities?.map((modality) => (
                  <span key={modality} className="rounded-full bg-white/5 px-3 py-1">
                    {modality}
                  </span>
                ))}
              </div>
              <p className="text-sm text-white/60">Credentials: {provider.credentials}</p>
              <p className="text-sm text-white/60">Format: {provider.virtual_only ? "Virtual" : "In-person & virtual"}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default ProvidersPage
