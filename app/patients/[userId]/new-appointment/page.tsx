import AppointmentForm from "@/components/forms/AppointmentForm"
import { getPatient } from "@/lib/actions/patient.actions"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

const NewAppointment = async ({ params, searchParams }: SearchParamProps) => {
  const userId = params?.userId

  if (!userId) {
    redirect('/')
  }

  const patient = await getPatient(userId)

  if (!patient) {
    redirect(`/patients/${userId}/register`)
  }

  const successParam = searchParams?.success
  const success = Array.isArray(successParam)
    ? successParam[0] === 'true'
    : successParam === 'true'

  return (
    <div className="flex min-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] space-y-8">
          <Image
            src="/spring2life.png"
            width={1000}
            height={1000}
            alt="logo"
            className="h-16 w-fit rounded-3xl"
          />

          {success && (
            <div className="rounded-2xl border border-green-700 bg-green-500/10 p-4 text-green-100">
              <p className="text-16-semibold">Appointment request received.</p>
              <p className="text-14-regular text-green-200">
                Our care team will confirm the schedule and send an SMS update shortly.
              </p>
            </div>
          )}

          <AppointmentForm userId={userId} patientId={patient.id} patientName={patient.name} />

          <div className="text-14-regular flex flex-col gap-2 text-dark-600">
            <p className="text-dark-700">
              Need to update your medical history?
            </p>
            <Link
              href={`/patients/${userId}/register`}
              className="text-green-500 underline"
            >
              Edit patient profile
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        width={1000}
        height={1000}
        alt="new appointment"
        className="side-img max-w-[45%]"
      />
    </div>
  )
}

export default NewAppointment
