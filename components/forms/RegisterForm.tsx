"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { GenderOptions } from "@/constants"
import { Label } from "../ui/label"


    const RegisterForm = ({ user }: {user: User}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
        name: "",
        email: "",
        phone: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
        setIsLoading(true);
        
        try {
        const userData = { name, email, phone }

        const user = await createUser(userData);
        
        if(user) router.push(`/patients/${user.$id}/register`)
        } catch (error) {
        console.log(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className="space-y-4">
                    <h1 className="header">
                        Welcome to Spring2Life 🍃
                    </h1>
                    <p className="text-dark-700">
                        Please complete the registration form to schedule your first appointment!
                    </p>
                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">
                            Personal Information
                        </h2>                        
                    </div>

        {/* FULL NAME */}
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Full Name"
                    placeholder="Nway Oo"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                    />

                <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
                    {/* EMAIL */}
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="hi@spring2life.com"
                        iconSrc="/assets/icons/email.svg"
                        iconAlt="email"
                        />
                    {/* PHONE */}
                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="phone"
                        label="Phone Number"
                        placeholder="(323)509-123"
                        />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    {/* DATE OF BIRTH */}
                    <CustomFormField
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="birthDate"
                        label="Date of Birth"
                        />
                    {/* GENDER */}
                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup className="flex h-11 gap-6 xl:justify-between" onValueChange={field.onChange} defaultValue={field.value}>
                                    {GenderOptions.map((option, i) => {
                                        const id = `gender-${i}`;
                                        return (
                                            <div key={id} className="flex items-center space-x-2">
                                                <RadioGroupItem value={option} id={id} title={option} />
                                                <Label htmlFor={id} className="cursor-pointer" title={option}>
                                                    {option}
                                                </Label>
                                            </div>
                                        );
                                    })}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">

                </div>

                <div className="flex flex-col gap-6 xl:flex-row">

                </div>

                <div className="flex flex-col gap-6 xl:flex-row">

                </div>

                <div className="flex flex-col gap-6 xl:flex-row">

                </div>


                </section>
        {/* SUBMIT */}
                <SubmitButton isLoading={isLoading}>
                    Register
                </SubmitButton>
            </form>
        </Form>
    )
}
export default RegisterForm