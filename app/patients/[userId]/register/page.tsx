import RegisterForm from '@/components/forms/RegisterForm'
import { getPatient, getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { redirect } from 'next/navigation'

const Register = async ({ params }: SearchParamProps) => {

    const { userId } = await params;
    const user = await getUser(userId);
  const patient = await getPatient(userId);

  if (patient) redirect(`/patients/${userId}/new-appointment`);

    return (
        <div className="flex h-screen max-h-screen">

            <section className="remove-scrollbar container max-w-[860px] flex-1 flex-col py-10">
                <div className="sub-container max-w-[496px]"> 
                <Image 
                    src="/spring2life.png"
                    width={10000}
                    height={10000}
                    alt="logo"
                    className="mb-12 h-20 w-fit rounded-3xl shadow-green-900 shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110"
                />

                <RegisterForm user={user}/>
                        <p className="copyright py-12">
                        © 2025 Spring2Life
                        </p>

                </div>
            </section>

            <Image 
                src="/assets/images/register-img.png"
                width={1000}
                height={1000}
                alt="patientForm"
                className="side-img max-w-[390px]"
            />
        </div>
    )
}

export default Register