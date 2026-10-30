# Sanjay A — Portfolio Website

A high-performance, dark-mode personal portfolio website for **Sanjay A**, Java Backend Developer.

## 🚀 Overview

- **Design Philosophy**: Minimalist obsidian aesthetic (`#0A0A0A`) with clean typography (`Inter` & `JetBrains Mono`), crisp borders, and subtle glowing accents.
- **Key Features**:
  - **Hero Section**: High-resolution professional portrait with status badge (`Available for Full-time Roles`), value proposition, and quick CTAs.
  - **Metrics Strip**: 1.5+ years experience, 2 companies (Beagle Security & Bridgeon), 100% microservice architecture, KTU B.Tech.
  - **About & Core Pillars**: In-depth backend engineering background (Microservices, JWT/RBAC security, PostgreSQL optimization, Docker & Agile).
  - **Experience**: Comprehensive breakdown of work at **Beagle Security** and **Bridgeon** with direct certificate verification triggers.
  - **Selected Projects**:
    - **Luna: Dress Shop E-Commerce Platform**: Java 21, Spring Boot 3, Spring Cloud, PostgreSQL, Docker, OpenFeign, stateless JWT, and Saga pattern.
    - **E-Commerce React Application**: Modern responsive shopping application with React.js, Tailwind CSS, Context API, and JSON Server mock backend.
  - **Certificates & Documents ("dcs photos") Showcase**:
    - **Beagle Security Internship Certificate**: High-definition digital certificate and original photo inspection, with PDF download.
    - **HackerRank Java (Basic) Certification**: Credential ID `CDOETOB5EE7C` with one-click copy, inspection modal, and PDF download.
    - **Official Resume (CV)**: Full professional CV with direct view & download options.
    - **Additional Credentials**: Oracle Dev Gym and Verdant IT Solutions.
  - **Interactive Document Lightbox**: Full-screen document viewer with zoom in (+), zoom out (-), 1:1 reset, and keyboard navigation (`Esc` to close).
  - **Skills Matrix**: Categorized tech stacks (Languages, Backend, Frontend, Database, DevOps, Concepts).
  - **Education & Leadership**: B.Tech at Mar Athanasius College of Engineering (KTU) & student committee leadership.
  - **Contact Section**: One-click email copy (`sanjaysr2902@gmail.com`), phone copy (`+91 75107 82632`), social links (GitHub & LinkedIn), and quick inquiry form.

---

## 📁 Directory Structure

```text
├── index.html                               # Main portfolio entry point
├── assets/
│   ├── css/
│   │   └── style.css                        # Complete responsive styles & dark theme
│   ├── js/
│   │   └── main.js                          # Navigation, modal lightbox & copy interactions
│   ├── images/
│   │   ├── headshot.png                     # Original HD portrait
│   │   ├── headshot-thumb.png               # Fast-loading optimized portrait
│   │   ├── cert_beagle.png                  # High-res Beagle Security certificate
│   │   ├── cert_beagle-thumb.jpg            # Fast-loading certificate preview
│   │   ├── cert_beagle_photo.jpg            # Original document photograph
│   │   ├── cert_java_basic.png              # High-res HackerRank certificate
│   │   └── cert_java_basic-thumb.png        # Fast-loading HackerRank preview
│   └── docs/
│       ├── Sanjay_A_Resume.pdf              # Official resume PDF
│       ├── Beagle_Security_Internship_Certificate.pdf
│       └── HackerRank_Java_Basic_Certificate.pdf
```

---

## 💻 How to Run Locally

Simply double-click `index.html` in your file browser (Finder), or run a lightweight local HTTP server:

```bash
# Using Python
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

---

## 🌐 Deployment

### Deploy to Vercel
```bash
npx vercel
```

### Deploy to GitHub Pages
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/sanjaybridgeon-tech/<repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository settings, navigate to **Pages** and set the source branch to `main`.

# new-resume
