# Grip City Handyman — Website

> A fully static, zero-dependency business website for a Portland handyman service.  
> Deployable to **GitHub Pages**, Netlify, or any static host in minutes.

---

## 🚀 Live Demo

After deploying to GitHub Pages your site will be available at:  
`https://<your-username>.github.io/<repo-name>/`

---

## 📁 Project Structure

```
grip-city-handyman/
├── index.html          ← Main public website
├── pages/
│   └── admin.html      ← Admin panel (password protected)
├── css/
│   ├── style.css       ← All public page styles
│   └── admin.css       ← Admin panel styles
├── js/
│   ├── main.js         ← Site interactions (sliders, reveal, animations)
│   └── admin.js        ← Admin auth, estimator, content tools
├── assets/             ← Place your own images here
└── README.md
```

---

## ✨ Features

### Public Website
- **Hero** — Full-screen with animated blueprint overlay, stats, and review card
- **Trust Banner** — Licensed / Insured / On-Time / Local
- **Services Grid** — 8 services with hover effects (mobile accordion)
- **Before & After Gallery** — 3 draggable image comparison sliders
- **How We Work** — Animated 4-step process with traveling highlight
- **Google Reviews** — Rating badge + 4 testimonial cards
- **Service Area** — Portland metro city badges
- **CTA Section** — Bold call-to-action with phone number
- **Footer** — Links, phone, service list, copyright

### Admin Panel (`/pages/admin.html`)
- Password protected via SHA-256 (no backend needed)
- **Content tab** — Edit business name, phone, hero text, stats, Google rating
- **Estimator tab** — Full job cost calculator:
  - Service type + sq ft or hours
  - Materials cost
  - Labor hours + rate
  - Profit margin %
  - Tax rate %
  - Live total calculation
  - Print / Save PDF button

---

## 🔧 Setup

### 1. Clone or download

```bash
git clone https://github.com/your-username/grip-city-handyman.git
cd grip-city-handyman
```

### 2. Open locally

No build step required. Just open `index.html` in your browser:

```bash
# macOS
open index.html

# Or use VS Code Live Server extension
```

### 3. Deploy to GitHub Pages

1. Push to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, root `/`
4. Your site is live at `https://your-username.github.io/repo-name/`

---

## ✏️ Customization

### Change phone number
Search and replace `9716662625` and `(971) 666-2625` throughout the HTML files.

### Change business name / location
Edit `index.html` and `pages/admin.html`:
- Business name: "Grip City Handyman"
- City: "Portland" / "Portland, Oregon"

### Change colors
Edit the CSS variables at the top of `css/style.css`:

```css
:root {
  --red:      #D92B2B;  /* Primary brand color */
  --navy:     #0B1E38;  /* Dark background */
  --gold:     #F5A623;  /* Accent color */
}
```

### Swap images
Replace the Unsplash URLs in `index.html` with your own hosted images.  
Place local images in the `assets/` folder and reference them as `assets/your-image.jpg`.

### Change admin password
The password is `handyman`. To change it:

1. Open `js/admin.js`
2. Find the `checkLogin()` function
3. Change `'handyman'` on this line:
   ```js
   const expectedBuf = await crypto.subtle.digest('SHA-256', encoder.encode('handyman'));
   ```
4. Replace `'handyman'` with your new password string.

---

## 📦 Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Semantic markup |
| CSS3 | Custom properties, Grid, Flexbox, animations |
| Vanilla JS | Sliders, scroll reveal, admin logic |
| Google Fonts | Barlow Condensed + Barlow |
| Web Crypto API | Password hashing (no plain-text secrets) |

**No frameworks. No build tools. No npm. Zero dependencies.**

---

## 🌐 Deploying Elsewhere

### Netlify
1. Drag the project folder into [netlify.com/drop](https://app.netlify.com/drop)
2. Done — live in seconds.

### Vercel
```bash
npx vercel --prod
```

### Traditional hosting (cPanel, FTP)
Upload all files maintaining the folder structure.

---

## 📋 To-Do / Upgrades

- [ ] Add a contact form (use [Formspree](https://formspree.io) for free backend-less forms)
- [ ] Connect admin "Save" to a real backend (Supabase, Firebase, or a simple JSON file)
- [ ] Add Google Analytics
- [ ] Add sitemap.xml for SEO
- [ ] Add real before/after photos to `assets/`

---

## 📄 License

MIT — free to use, modify, and deploy for personal or commercial projects.

---

*Built for Grip City Handyman · Portland, OR · (971) 666-2625*
