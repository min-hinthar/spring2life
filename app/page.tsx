import Image from "next/image"
import Link from "next/link"

import RegisterForm from "@/components/forms/RegisterForm"
import AppointmentForm from "@/components/forms/AppointmentForm"
import { CareTeam, FeatureHighlights, JourneySteps } from "@/constants"
import AppointmentCard from "@/components/cards/AppointmentCard"

const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#030712] via-[#0c1220] to-[#0f1a2b] text-white">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 lg:px-12">
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Supabase-native mental health scheduling suite
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Spring2Life: mental health appointments that feel human, organized, and immediate.
              </h1>
              <p className="text-lg text-white/70">
                Patients register once, book multiple therapy or psychiatry sessions, and coordinators confirm everything from a modern dashboard.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {["24/7 booking", "Admin dashboard", "Supabase schemas"].map((label) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm text-white/70">
                  {label}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              <span>
                Need to review requests? Visit the {" "}
                <Link href="/admin" className="text-green-300 underline">
                  admin dashboard
                </Link>
              </span>
            </div>
          </div>

          <div className="relative rounded-[32px] bg-gradient-to-br from-green-500/20 via-green-400/10 to-transparent p-6 shadow-2xl ring-1 ring-white/10">
            <p className="text-sm uppercase tracking-widest text-white/70">Care team spotlight</p>
            <div className="mt-6 space-y-4">
              {CareTeam.map((member) => (
                <div key={member.name} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Image src={member.image} alt={member.name} width={48} height={48} className="rounded-full" />
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-white/70">{member.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
            <RegisterForm />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
            <AppointmentForm />
          </div>
        </section>

        <section className="grid gap-8 rounded-3xl border border-white/5 bg-white/5 p-8">
          <div className="flex flex-col gap-2">
            <p className="text-sm uppercase tracking-wider text-green-200">Platform highlights</p>
            <h2 className="text-3xl font-semibold">Admin-grade visibility for every request</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {FeatureHighlights.map((feature) => (
              <div key={feature.title} className="rounded-3xl border border-white/10 bg-[#111b2e]/70 p-6 shadow-lg">
                <p className="text-lg font-semibold">{feature.title}</p>
                <p className="mt-2 text-sm text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 rounded-3xl border border-white/5 bg-[#0f1724] p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-widest text-green-200">How Spring2Life works</p>
            <h2 className="text-3xl font-semibold">From registration to confirmed care in four steps</h2>
            <div className="space-y-4">
              {JourneySteps.map((step) => (
                <div key={step.label} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-200">
                    {step.label}
                  </div>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="text-sm text-white/70">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-wider text-white/70">Live appointment preview</p>
            <p className="mt-2 text-2xl font-semibold text-white">Admin dashboard cards</p>
            <p className="mt-2 text-sm text-white/70">
              The dashboard lists each request with patient context, focus areas, and live status updates.
            </p>
            <div className="mt-6 space-y-4">
              {CareTeam.slice(0, 2).map((member, index) => (
                <AppointmentCard
                  key={`${member.name}-${index}`}
                  appointment={{
                    id: `${index}`,
                    patient_id: `${index}`,
                    provider: member.name,
                    specialty: member.specialty,
                    focus_area: "Anxiety & grounding",
                    session_type: "Individual Therapy",
                    status: index % 2 === 0 ? "confirmed" : "pending",
                    scheduled_at: new Date(Date.now() + index * 7200000).toISOString(),
                    duration_minutes: 60,
                    note: "",
                    cancellation_reason: null,
                    created_at: new Date().toISOString(),
                    patients: {
                      id: `${index}`,
                      created_at: new Date().toISOString(),
                      full_name: index === 0 ? "Nandar" : "Ko Aung",
                      email: index === 0 ? "nandar@spring2life.org" : "aung@spring2life.org",
                      phone: "+959111111",
                      birth_date: new Date().toISOString(),
                      gender: "Female",
                      support_needs: "",
                      emergency_contact_name: "Lin",
                      emergency_contact_phone: "+959888888",
                      preferred_communication: "SMS text",
                      care_team_notes: "",
                    },
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Home
