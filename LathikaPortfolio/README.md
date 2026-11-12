# LathikaPortfolio

A personal portfolio website built using React and Vite to showcase my profile, technical skills, projects, certifications, education, and resume.

## Features

- Personal introduction and About section
- Technical skills showcase
- Projects portfolio
- Certifications and certificate gallery
- Education and learning journey
- Resume viewing and printing
- Contact section
- Responsive user interface

## Technologies Used

- React
- JavaScript
- HTML5
- CSS3
- Vite

## Project Structure

```text
LathikaPortfolio/
├── public/
│   ├── certs/
│   ├── profile.jpg
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── data.js
│   ├── main.jsx
│   └── pages.jsx
├── .gitignore
├── env.example
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone this repository.

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project folder.

   ```bash
   cd LathikaPortfolio
   ```

3. Install the dependencies.

   ```bash
   npm install
   ```

4. Start the development server.

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in the terminal.

## Available Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

- `npm run dev` — Starts the development server.
- `npm run lint` — Checks code quality using ESLint.
- `npm run build` — Creates the production build.
- `npm run preview` — Previews the production build locally.

## Customisation

- Update portfolio details, skills, projects, and certificate information in `src/data.js`.
- Replace `public/profile.jpg` to change the profile image.
- Add certificate images to `public/certs/` and update their references in the source code.

## Deployment

Run `npm run build` to generate the production files in the `dist/` directory. The project can be deployed using a suitable static hosting platform after configuring its deployment settings.

## Author

**Lathika R**

B.E. Computer Science and Engineering – Cyber Security

GitHub: https://github.com/im-lathika
