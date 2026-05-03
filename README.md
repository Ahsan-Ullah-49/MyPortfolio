# Ahsan Ullah | Creative Full-Stack Developer & UI/UX Specialist

![Portfolio Preview](./public/og-image.jpg)

**Live Demo:** [https://ahsan-ullah-portfolio.web.app/](https://ahsan-ullah-portfolio.web.app/)

## About the Project
A premium, cinematic personal portfolio pushing the boundaries of web animation and interactive design. This platform was engineered from the ground up to showcase a deep understanding of modern frontend technologies, featuring a "Dark Luxury" aesthetic, silky smooth micro-animations, and a fully functional private chat ecosystem.

## 🚀 Tech Stack
- **Framework:** React + Vite
- **Styling:** Tailwind CSS (Custom Configuration)
- **Animation:** GSAP (ScrollTrigger) & Custom CSS Keyframes
- **Backend/Chat:** Firebase Realtime Database
- **Icons:** Lucide React

## ✨ Key Features
- **Cinematic UI/UX:** A bespoke "Dark Luxury" theme featuring dynamic gradients, glassmorphism, and custom ambient glows.
- **Advanced Animations:** Implemented complex GSAP ScrollTrigger animations, floating elements, magnetic buttons, and smooth scrolling for a premium feel.
- **Private Live Chat:** Replaced standard EmailJS forms with a fully custom, private live chat system powered by Firebase, complete with a hidden Admin Dashboard for real-time replies.
- **Fully Responsive:** Meticulously crafted to perform and look beautiful across all mobile, tablet, and desktop devices.
- **SEO Optimized:** Built-in Open Graph tags, meta descriptions, and semantic HTML to ensure high visibility on search engines and professional link-sharing previews.

## 💻 Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ahsan-Ullah-49/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY="your_api_key"
   VITE_FIREBASE_AUTH_DOMAIN="your_auth_domain"
   VITE_FIREBASE_DATABASE_URL="your_database_url"
   VITE_FIREBASE_PROJECT_ID="your_project_id"
   VITE_FIREBASE_STORAGE_BUCKET="your_storage_bucket"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your_messaging_sender_id"
   VITE_FIREBASE_APP_ID="your_app_id"
   VITE_FIREBASE_MEASUREMENT_ID="your_measurement_id"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

## 🛠️ Performance Optimizations
- **Lazy Loading:** Setup for images and heavy components to ensure lightning-fast initial load times.
- **Environment Security:** Sensitive API keys are securely managed via environment variables.
- **Secure Links:** All external links use `rel="noopener noreferrer"` to prevent security vulnerabilities.

---
*Designed & Developed by [Ahsan Ullah](https://github.com/Ahsan-Ullah-49)*
