const fs = require("fs");
const path = require("path");

function write(file, content) {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, content);
}

console.log("Creating Grip City Handyman project...");

write("package.json", `
{
  "name": "grip-city-handyman",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.3",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.344.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
`);

write("vite.config.js", `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})
`);

write("index.html", `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Grip City Handyman</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body>
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
</body>
</html>
`);

write("src/main.jsx", `
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`);

write("src/App.jsx", `
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}
`);

write("src/pages/Home.jsx", `
import React from "react";

export default function Home(){
  return (
    <div style={{background:"#111",color:"#fff",padding:"120px",textAlign:"center"}}>
      <h1 style={{fontSize:"48px"}}>Grip City Handyman</h1>
      <p>Professional Handyman Services — Portland, Oregon</p>
      <p>(971) 666-2625</p>
    </div>
  )
}
`);

console.log("Project created.");
