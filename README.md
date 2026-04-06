# Abhiraj P R — Portfolio Website

A modern, responsive personal portfolio website built with HTML, CSS, and JavaScript.

## Features

- Dark/Light theme toggle with localStorage persistence
- Typing animation in hero section
- Scroll-triggered reveal animations
- GitHub API integration with caching and fallback data
- Fully responsive (mobile, tablet, desktop)
- SEO optimized with meta tags
- Zero dependencies — pure HTML/CSS/JS

## Project Structure

```
├── index.html          # Main page (all sections)
├── css/
│   ├── styles.css      # Design system, layout, all component styles
│   └── animations.css  # Keyframes, scroll reveals, reduced motion
├── js/
│   ├── main.js         # Navigation, theme, typing animation, scroll
│   └── github.js       # GitHub API fetch with caching + fallback
├── assets/
│   └── profile-placeholder.svg
├── Abhiraj_P_R_Resume_Senior_Salesforce_Developer.pdf
└── README.md
```

## Deployment to GitHub Pages

### Step 1: Create Repository

Go to [github.com/new](https://github.com/new) and create a repository named `abhirajpr.github.io`.

### Step 2: Push Code

```bash
cd "My Portfolio Site"
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/abhirajpr/abhirajpr.github.io.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository **Settings**
2. Navigate to **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Choose branch: **main**, folder: **/ (root)**
5. Click **Save**

### Step 4: Visit Your Site

Your portfolio will be live at: **https://abhirajpr.github.io**

It may take 1-2 minutes for the first deployment.

## Customization

- **Colors**: Edit CSS custom properties in `css/styles.css` under `:root`
- **Content**: Edit sections directly in `index.html`
- **Resume**: Replace the PDF file and update the filename in the download link
- **Profile Image**: Replace `assets/profile-placeholder.svg` with your photo

## Tech Stack

- **Fonts**: Syne (display), Outfit (body), Space Mono (code)
- **Icons**: Inline SVGs (no external dependencies)
- **Animations**: CSS keyframes + Intersection Observer API
- **GitHub API**: REST v3 with sessionStorage caching
