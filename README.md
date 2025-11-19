# Spring2Life

<img src="./public/spring2life.png" alt="logo" width="200"/>

### 🌐 Demo
Deployed URL: https://spring2life.vercel.app/

## 📝 Overview
Spring2Life is a healthcare patient management application dedicated to supporting the mental health needs of victims displaced by the 7.7 magnitude earthquake in Burma. Our mission is to renew hope and bring care to those in need through technology, empathy, and innovation.

About Spring2Life
Spring2Life is built with care and purpose—a robust platform where patients can easily register, book, and manage appointments with doctors and therapists. Administrators gain full control with powerful tools to schedule, confirm, or cancel appointments, while integrated SMS notifications ensure everyone stays informed. Designed with flexibility, responsiveness, and modern aesthetics in mind, Spring2Life reflects our commitment to better mental health and improved patient care.

Logo & Design
Our modern logo embodies the spirit of renewal and vitality:
Icon: A sleek green circle symbolizing growth, spring, and new beginnings.
Typography: The text "Spring2Life" is set in a modern, sans-serif typeface that conveys clarity, energy, and approachability.
Color Palette: The design features fresh green tones paired with neutral dark accents, representing both nature and professionalism.

## ✨ Features

Spring2Life offers the following features and functionalities:

- Patient Registration: Create a tailor-made personal profile for a seamless healthcare experience.

- Appointment Booking: Schedule appointments easily with doctors and therapists—patients can book multiple sessions according to their needs.

- Admin Dashboard: A user-friendly control panel for administrators to manage all appointment requests, with the capability to:

- Confirm and schedule appointments.

- Cancel appointments as needed.

- SMS Notifications: Integrated Twilio functionality to send timely SMS notifications to patients upon appointment confirmation.

- Secure File Upload: Utilize Supabase storage to securely manage and store patient files.

- Responsive Design: Fully optimized across all devices—desktop, tablet, and mobile.

- Application Performance: Sentry integration monitors performance and logs errors in real time, ensuring a reliable user experience.

- Extensible Architecture: A modular and reusable codebase streamlines further development and future enhancements.

## 🚀 Tech-Stacks

The project is built using the following technologies:

- Next.js – Robust framework for server-side rendering and routing.

- Supabase – Postgres + storage backend for patient profiles, appointments, and files.

- Typescript – Ensures type safety and improved code quality.

- TailwindCSS – Utility-first CSS framework for rapid, responsive UI development.

- ShadCN – A curated, reusable component library that enhances design consistency.

- Twilio – Reliable SMS service to send appointment confirmations.

- Sentry – Performance monitoring and real-time error tracking.


## 🛠️ Installation

Prerequisites

Ensure you have the following installed and set up:

Node.js v18+
Yarn or npm
A Supabase project (database + storage bucket)
Twilio account credentials
(Optional) Sentry account DSN for performance monitoring

Installation
Clone the Repository:

bash
git clone https://github.com/yourusername/spring2life.git
cd spring2life
Install Dependencies:

bash
npm install
or
yarn install
Environment Configuration
Create a .env.local in the root directory with the following settings (replace with your Supabase project details — values below show the demo project you shared):

env
SUPABASE_URL=https://nfbpqvzcwjtsvxiopznu.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mYnBxdnpjd2p0c3Z4aW9wem51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MzIwMDgsImV4cCI6MjA3OTEwODAwOH0.ucMNNYzojBJ9Tm9QQUPAtdqKmluPyODrhzLClDI7zis
SUPABASE_BUCKET_ID=patient-documents
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM_PHONE=your_twilio_phone_number
SENTRY_DSN=your_sentry_dsn
Ensure the service role key stays on the server only. Never expose it to client-side code.

Running the Application
Start the development server with:

bash
npm run dev
or
yarn dev
Visit http://localhost:3000 in your web browser to interact with Spring2Life.

### Supabase schema

Run the SQL in [`supabase/schema.sql`](./supabase/schema.sql) inside the Supabase SQL editor for your project. It creates the required `users`, `patients`, and `appointments` tables plus the `patient-documents` storage bucket that the app expects for uploading identification files.

## 🏗️Project Structure

A well-thought-out structure powers Spring2Life, ensuring readability and maintainability:

/pages: Next.js pages for client-side and server-side rendering.

/components: Reusable, responsive UI components built with TailwindCSS and ShadCN.

/services: Modules interfacing with Supabase, Twilio, and Sentry.

/styles: TailwindCSS configuration and global styling resources.

/utils: Utility functions and helper scripts for common tasks.

This structure supports ongoing development and encourages clear code separation for future features and adjustments.

## 📖 License

Spring2Life is open source and licensed under the MIT license. You can find the code base and the README file on GitHub. I welcome any feedback, suggestions, or contributions to improve the project and make it more useful for the community.

## 🤝 Contribution Guidelines

If you have any feedback, suggestions, or questions, feel free to contact me at min@mandalaymorningstar.com or open an issue on GitHub. I would love to hear from you and improve the project. Thank you for using and supporting the web app.

We welcome contributions that help Spring2Life grow stronger in building accessible healthcare solutions. To contribute:

Fork this repository.

Create a new branch for your feature or bugfix (e.g., git checkout -b feature/new-idea).

Commit your changes with clear messages.

Push to your branch (git push origin feature/new-idea).

Open a pull request detailing your changes.

For major changes, please open an issue to discuss your ideas first.

## 🙏 Acknowledgements

This project is inspired by JS Mastery and the Burmese Spring Revolution Civil Disobedience Movement. The project aims to support the cause of democracy and human rights in Myanmar through cutting-edge web development tech stacks.

Compassionate Care: Dedicated to the mental health heroes and vulnerable communities impacted by natural disasters.

Technology Empowerment: Grateful to the contributors and communities behind Next.js, Supabase, Twilio, Sentry, TailwindCSS, and ShadCN.

Open Source Spirit: Inspired by the community-driven effort to create accessible technology for all.

GitHub: https://github.com/min-hinthar 
Email: min@mandalaymorningstar.com 
LinkedIn: https://www.linkedin.com/in/minkkhant93/ 
Portfolio: https://minkkhant-portfolio.netlify.app/ 