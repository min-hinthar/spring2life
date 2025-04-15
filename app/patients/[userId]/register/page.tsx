import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Register = async ({ params: {userId}}: SearchParamProps) => {

    const user = await getUser(userId);

    return (
        <div className="flex h-screen max-h-screen">

            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[496px]"> 
                <Image 
                    src="/spring2life.png"
                    width={10000}
                    height={10000}
                    alt="logo"
                    className="mb-12 h-20 w-fit rounded-3xl shadow-green-900 shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110"
                />

                <RegisterForm user={user}/>

                    <div className="text-14-regular mt-20 flex justify-between">
                        <p className="justify-items-end text-dark-600 xl:text-left">
                        © 2025 Spring2Life
                        </p>

                        <Link href="/admin=true" className="text-green-500 transition-transform duration-300 ease-in-out transform hover:scale-110">
                        Admin
                        </Link>
                    </div>
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