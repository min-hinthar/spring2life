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

- Secure File Upload: Utilize Appwrite storage to securely manage and store patient files.

- Responsive Design: Fully optimized across all devices—desktop, tablet, and mobile.

- Application Performance: Sentry integration monitors performance and logs errors in real time, ensuring a reliable user experience.

- Extensible Architecture: A modular and reusable codebase streamlines further development and future enhancements.

## 🚀 Tech-Stacks

The project is built using the following technologies:

- Next.js – Robust framework for server-side rendering and routing.

- Appwrite – Comprehensive backend as a service for authentication, file storage, and database management.

- Typescript – Ensures type safety and improved code quality.

- TailwindCSS – Utility-first CSS framework for rapid, responsive UI development.

- ShadCN – A curated, reusable component library that enhances design consistency.

- Twilio – Reliable SMS service to send appointment confirmations.

- Sentry – Performance monitoring and real-time error tracking.


## 🛠️ Installation

Prerequisites

Ensure you have the following installed and set up:

Node.js v14+
Yarn or npm
A running Appwrite instance
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
Create a .env.local in the root directory with the following settings:

env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://your-appwrite-endpoint.com
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM_PHONE=your_twilio_phone_number
SENTRY_DSN=your_sentry_dsn
Ensure you replace the placeholder values with your actual credentials.

Running the Application
Start the development server with:

bash
npm run dev
or
yarn dev
Visit http://localhost:3000 in your web browser to interact with Spring2Life.

## 🏗️Project Structure

A well-thought-out structure powers Spring2Life, ensuring readability and maintainability:

/pages: Next.js pages for client-side and server-side rendering.

/components: Reusable, responsive UI components built with TailwindCSS and ShadCN.

/services: Modules interfacing with Appwrite, Twilio, and Sentry.

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

Technology Empowerment: Grateful to the contributors and communities behind Next.js, Appwrite, Twilio, Sentry, TailwindCSS, and ShadCN.

Open Source Spirit: Inspired by the community-driven effort to create accessible technology for all.

GitHub: https://github.com/min-hinthar 
Email: min@mandalaymorningstar.com 
LinkedIn: https://www.linkedin.com/in/minkkhant93/ 
Portfolio: https://minkkhant-portfolio.netlify.app/ 