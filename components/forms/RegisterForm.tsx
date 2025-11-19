"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser, registerPatient } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"


    const RegisterForm = ({ user }: {user: User}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: {
        ...PatientFormDefaultValues,
        name: "",
        email: "",
        phone: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
        setIsLoading(true);

        let formData;

        if (values.identificationDocument && values.identificationDocument.length > 0) {
            const blobFile = new Blob([values.identificationDocument[0]], {
                type: values.identificationDocument[0].type,
            })

            formData = new FormData();
            formData.append('blobFile', blobFile);
            formData.append('fileName', values.identificationDocument[0].name)
        }

        try {
            const patientData = {
                ...values,
                userId: user.$id,
                birthDate: new Date(values.birthDate),
                IdentificationDocument: formData,
            }
            
            // @ts-expect-error : allergies optional
            const patient = await registerPatient(patientData);
            
            if (patient) router.push(`/patients/${user.$id}/new-appointment`)
        } catch (error) {
            console.log(error)
        }
        
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

                    {/* ADDRESS */}
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="address"
                            label="Address"
                            placeholder="No. 7, 36th Street, Mandalar Township, Mandalay"
                        />

                    {/* OCCUPATION */}
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="occupation"
                            label="Occupation"
                            placeholder="Self-Employed, Manager, Clerk..."
                        />

                    <div className="flex flex-col gap-6 xl:flex-row">
                    {/* EMERGENCY CONTACT */}
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="emergencyContactName"
                            label="Emergency Contact Name"
                            placeholder="Next of Kin"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.PHONE_INPUT}
                            control={form.control}
                            name="emergencyContactNumber"
                            label="Emergency Contact Number"
                            placeholder="(323)509-123"
                        />
                    </div>
                </section>

            {/* MEDICAL INFORMATION */}
                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">
                            Medical Information
                        </h2>                        
                    </div>
                </section>
            {/* PRIMARY PHYSICIAN */}
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="primaryPhysician"
                        label="Primary Physician"
                        placeholder="Select a Physician"
                    >
                        {
                            Doctors.map((doctor) => (
                                <SelectItem
                                    key={doctor.name}
                                    value={doctor.name}
                                >
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <Image
                                            src={doctor.image}
                                            width={32}
                                            height={32}
                                            alt={doctor.name}
                                            className="rounded-full border border-dark-500"
                                        />
                                        <p>
                                            {doctor.name}
                                        </p>
                                    </div>
                                </SelectItem>
                            ))
                        }
                    </CustomFormField>

                <div className="flex flex-col gap-6 xl:flex-row">
            {/* INSURANCE PROVIDER */}
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="insuranceProvider"
                        label="Insurance Provider"
                        placeholder="Manu Life, AIG, Chubb, Dai-Ichi Life,Prudential..."
                    />

            {/* INSURANCE POLICY NUMBER */}
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="insurancePolicyNumber"
                        label="Insurance Policy Number"
                        placeholder="CBA987654321..."
                    />
                </div>


                <div className="flex flex-col gap-6 xl:flex-row">
            {/* ALLERGIES */}
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="allergies"
                        label="Allergies (if any)"
                        placeholder="Peanuts, Gluten, Penicillin..."
                    />

            {/* CURRENT MEDICATIONS */}
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="currentMedication"
                        label="Current Medication (if any)"
                        placeholder="Ibuprofen 200mg, Buspirone HCL 10mg..."
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
            {/* FAMILY MEDICAL HISTORY */}
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="familyMedicalHistory"
                        label="Family Medical History"
                        placeholder="Paternal Diabetes Type2, Maternal High Cholestorl, Hypertension..."
                    />

            {/* PAST MEDICAL HISTORY */}
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="pastMedicalHistory"
                        label="Past Medical History"
                        placeholder="Appendectomy, Child Birth, Tonsillectomy..."
                    />
                </div>

        {/* IDENTIFICATION & VERIFICATION */}
                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">
                            Identification & Verification
                        </h2>                        
                    </div>
                </section>

        {/* ID TYPE */}
                <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="identificationType"
                        label="Identification Type"
                        placeholder="Select an Identification Type"
                    >
                        {
                            IdentificationTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))
                        }
                    </CustomFormField>

        {/* ID NUMBER */}
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="identificationNumber"
                        label="Identification Number"
                        placeholder="12/BHN(N)987654"
                    />

        {/* ID INPUT */}
                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="identificationDocument"
                        label="Scanned Copy of Identification Document"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <FileUploader
                                    files={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                        )}
                    />
        {/* CONSENT & PRIVACY */}
                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">
                            Consent & Privacy
                        </h2>                        
                    </div>
                </section>

                <CustomFormField 
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name='treatmentConsent'
                    label="I consent to treatment options provided via Spring2Life."
                />
                <CustomFormField 
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name='disclosureConsent'
                    label="I consent to disclosure of personal information for patient application."
                />
                <CustomFormField 
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name='privacyConsent'
                    label="I consent to privacy policies of Spring2Life."
                />

        {/* SUBMIT */}
                <SubmitButton isLoading={isLoading}>
                    Register
                </SubmitButton>
            </form>
        </Form>
    )
}
export default RegisterForm