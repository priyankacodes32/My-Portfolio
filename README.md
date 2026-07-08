# Premium UI/UX Designer Portfolio

A premium, modern, responsive single-page portfolio website for a UI/UX Designer. Built using HTML5, CSS3, Bootstrap 5, and Vanilla JavaScript with a modular component-loading architecture.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.0.0 or higher recommended)
- npm (installed automatically with Node.js)

### Installation

1. Clone or download the repository into your preferred folder.
2. Open a terminal in the project directory.
3. Install the dependencies (Vite dev server):

   ```bash
   npm install
   ```

### Running Locally

To run the development server with hot-reloading:

```bash
npm run dev
```

The terminal will display a local address (e.g., `http://localhost:5173`). Open that URL in your browser to view the portfolio.

## 📁 Project Structure

```
├── index.html                # Entry point & core skeleton layout
├── package.json              # NPM dependencies & scripts (Vite dev server)
├── README.md                 # Project guide
├── components/               # Modular HTML components loaded dynamically
│   ├── navbar.html           # Sticky navigation header with backdrop blur
│   ├── hero.html             # Hero page with glowing gradients & floating UI cards
│   ├── about.html            # Profile introduction & core values
│   ├── skills.html           # Tech & Design skills mapping
│   ├── projects.html         # Portfolio case studies with expandable sections
│   ├── process.html          # Interactive horizontal design process timeline
│   ├── webdev.html           # Smaller "Beyond Design" development projects
│   ├── contact.html          # High-converting CTA and message form
│   └── footer.html           # Minimalist footer with links
└── assets/
    ├── css/
    │   ├── index.css         # Main theme layout & typography styles
    │   └── animations.css    # Interactive micro-animations & glowing bubbles
    ├── js/
    │   ├── app.js            # General UI interactions & toggles
    │   ├── componentLoader.js# Asynchronous HTML section loader
    │   └── animations.js     # IntersectionObserver scroll fade triggers
    ├── resume/
    │   └── Resume.pdf        # Stub resume download target
    └── images/               # Image placeholder asset directories
```

## 🎨 Design System

- **Background Palette**: Dark mode Hero (`#0F172A`), Light mode Body (`#F8FAFC`).
- **Accent Shades**: Indigo (`#4F46E5`), Cyan (`#06B6D4`).
- **Typography Scale**:
  - Hero Heading: `64px` Manrope
  - Section Heading: `40px` Manrope
  - Project Title: `28px` Manrope
  - Body: `18px` Inter
  - Small Text: `16px` Inter
- **Interactions**:
  - Sticky frosted-glass navbar.
  - Floating UI dashboard cards.
  - Dynamic IntersectionObserver reveal animations.
  - Interactive Project Case Study expansions.
  - Active tab highlighting synced with screen scroll.
