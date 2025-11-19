export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [] as File[],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Phyo Wai",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Nway Oo",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "Lin Lat",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Htet Nay",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Myat Noe",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Zarni Kaung",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Kyal Sin",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Min Maw Kon",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Mohammad Myo",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};