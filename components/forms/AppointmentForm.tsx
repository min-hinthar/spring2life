"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { AppointmentBookingSchema } from "@/lib/validation"
import { CareTeam, FocusAreas, ProviderSpecialties, SessionTypes } from "@/constants"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { FormFieldType } from "./field-types"
import { SelectItem } from "../ui/select"

const durations = [30, 45, 60, 90]

const AppointmentForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [lastBooked, setLastBooked] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const form = useForm<z.infer<typeof AppointmentBookingSchema>>({
    resolver: zodResolver(AppointmentBookingSchema),
    defaultValues: {
      patientEmail: "",
      provider: CareTeam[0].name,
      specialty: CareTeam[0].specialty,
      sessionType: SessionTypes[0],
      focusArea: FocusAreas[0],
      scheduledAt: new Date(Date.now() + 3600 * 1000),
      durationMinutes: 60,
      note: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof AppointmentBookingSchema>) => {
    setIsLoading(true)
    setErrorMessage("")
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error?.error || "Unable to create appointment")
      }

      const appointment = await response.json()
      setLastBooked(appointment?.scheduled_at ?? null)
      form.reset({
        ...values,
        scheduledAt: new Date(Date.now() + 3600 * 1000),
        note: "",
      })
    } catch (error) {
      console.error(error)
      setErrorMessage(error instanceof Error ? error.message : "Unable to create appointment")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-white">Appointment booking</h3>
          <p className="text-sm text-dark-600">
            Use the email tied to your patient profile. Coordinators can confirm, cancel, or reschedule instantly.
          </p>
        </div>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="patientEmail"
          label="Patient email"
          placeholder="care@spring2life.org"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <div className="flex flex-col gap-4 md:flex-row">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="provider"
            label="Preferred provider"
            placeholder="Choose a therapist"
          >
            {CareTeam.map((member) => (
              <SelectItem key={member.name} value={member.name}>
                {member.name}
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="specialty"
            label="Specialty"
            placeholder="Select a specialty"
          >
            {ProviderSpecialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="sessionType"
            label="Session type"
            placeholder="Select a format"
          >
            {SessionTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="focusArea"
            label="Focus area"
            placeholder="Select a focus"
          >
            {FocusAreas.map((focus) => (
              <SelectItem key={focus} value={focus}>
                {focus}
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="scheduledAt"
            label="Preferred date"
            showTimeSelect
            dateFormat="MMM d, yyyy h:mm aa"
          />
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="durationMinutes"
            label="Session length"
            placeholder="Select duration"
          >
            {durations.map((duration) => (
              <SelectItem key={duration} value={duration.toString()}>
                {duration} minutes
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="note"
          label="Additional notes (optional)"
          placeholder="List accessibility support, interpreters, or medication updates"
        />

        {errorMessage && <p className="text-xs text-red-300">{errorMessage}</p>}

        {lastBooked && (
          <p className="text-xs text-green-300">
            Requested {new Date(lastBooked).toLocaleString("en-US")}. We will confirm soon!
          </p>
        )}

        <SubmitButton isLoading={isLoading}>Request sessions</SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm
