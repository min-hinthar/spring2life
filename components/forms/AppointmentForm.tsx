"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { CreateAppointmentSchema } from "@/lib/validation"
import { FormFieldType } from "./PatientForm"
import { Doctors } from "@/constants"
import { SelectItem } from "../ui/select"
import { createAppointment } from "@/lib/actions/appointment.actions"
import { useRouter } from "next/navigation"

interface AppointmentFormProps {
  userId: string
  patientId: string
  patientName: string
}

const AppointmentForm = ({ userId, patientId, patientName }: AppointmentFormProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof CreateAppointmentSchema>>({
    resolver: zodResolver(CreateAppointmentSchema),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(Date.now()),
      reason: "",
      note: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof CreateAppointmentSchema>) => {
    setIsLoading(true)

    try {
      await createAppointment({
        userId,
        patientId,
        primaryPhysician: values.primaryPhysician,
        reason: values.reason,
        schedule: values.schedule,
        status: "pending",
        note: values.note,
      })

      router.push(`/patients/${userId}/new-appointment?success=true`)
      form.reset({
        primaryPhysician: "",
        schedule: new Date(Date.now()),
        reason: "",
        note: "",
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="space-y-1">
          <p className="text-dark-700 text-sm uppercase tracking-wide">Schedule for</p>
          <h2 className="header">{patientName}</h2>
        </section>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Preferred Physician"
          placeholder="Select a Physician"
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              {doctor.name}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="schedule"
          label="Appointment Date"
          showTimeSelect
          dateFormat="MMM d, yyyy h:mm aa"
        />

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="reason"
          label="Reason for visit"
          placeholder="Share what we should prepare for"
        />

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="note"
          label="Additional notes (optional)"
          placeholder="Transportation needs, medication reminders, etc."
        />

        <SubmitButton isLoading={isLoading}>Book appointment</SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm
