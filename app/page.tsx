import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">

      {/* TODO: OTP Verification | PasskeyModal */}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]"> 
          <Image 
            src="/spring2life.png"
            width={10000}
            height={10000}
            alt="logo"
            className="mb-12 h-20 w-fit rounded-3xl shadow-green-900 shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110"
          />

          <PatientForm/>

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
        src="/assets/images/karenIDP.jpg"
        width={1000}
        height={1000}
        alt="patientForm"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
