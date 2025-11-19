"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { PatientRegistrationSchema } from "@/lib/validation"
import { CommunicationPreferences, GenderOptions, LanguagePreferences, PatientRegistrationDefaults } from "@/constants"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { FormFieldType } from "./field-types"
import { SelectItem } from "../ui/select"

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const form = useForm<z.infer<typeof PatientRegistrationSchema>>({
    resolver: zodResolver(PatientRegistrationSchema),
    defaultValues: {
      ...PatientRegistrationDefaults,
      consentToShare: false,
    },
  })

  const onSubmit = async (values: z.infer<typeof PatientRegistrationSchema>) => {
    setIsLoading(true)
    setErrorMessage("")
    try {
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error?.error || "Unable to save profile")
      }

      setHasSubmitted(true)
      form.reset({ ...PatientRegistrationDefaults, consentToShare: true })
    } catch (error) {
      console.error(error)
      setErrorMessage(error instanceof Error ? error.message : "Unable to save profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-white">Patient registration</h3>
          <p className="text-sm text-dark-600">
            Create a personal profile once. Your care team will use it every time you book support.
          </p>
        </div>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="fullName"
          label="Full name"
          placeholder="Thandar"
          iconSrc="/assets/icons/user.svg"
          iconAlt="full name"
        />

        <div className="flex flex-col gap-4 md:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="care@spring2life.org"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone"
            placeholder="+959 123 456"
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Birth date"
          />
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="gender"
            label="Gender"
            placeholder="Select a gender"
          >
            {GenderOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="supportNeeds"
          label="How can we support you?"
          placeholder="Tell us about your mental health goals, triggers, or accessibility needs"
        />

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="personalStory"
          label="Share your story"
          placeholder="Share the context that helps us honor your lived experience"
        />

        <div className="flex flex-col gap-4 md:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Emergency contact"
            placeholder="Ko Min Thu"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactPhone"
            label="Emergency contact phone"
            placeholder="+959 222 555"
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="preferredCommunication"
            label="Preferred updates"
            placeholder="Choose a channel"
          >
            {CommunicationPreferences.map((mode) => (
              <SelectItem key={mode} value={mode}>
                {mode}
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="preferredLanguage"
            label="Preferred language"
            placeholder="Select language"
          >
            {LanguagePreferences.map((language) => (
              <SelectItem key={language} value={language}>
                {language}
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="careTeamNotes"
            label="Care team notes (optional)"
            placeholder="Share medication reminders, trusted guardians, or safety plans"
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="consentToShare"
          label="I consent to share these details with the Spring2Life care team"
        />

        {errorMessage && <p className="text-xs text-red-300">{errorMessage}</p>}

        <SubmitButton isLoading={isLoading}>
          {hasSubmitted ? "Profile updated" : "Save profile"}
        </SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm
