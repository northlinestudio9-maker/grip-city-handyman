const fs = require("fs")
const path = require("path")

function write(file, content) {
  const dir = path.dirname(file)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(file, content)
}

/* ---------- PAGES ---------- */

write("src/pages/Home.jsx", `
import React from "react"
import HeroSection from "../components/home/HeroSection"
import TrustSection from "../components/home/TrustSection"
import ServicesSection from "../components/home/ServicesSection"
import BeforeAfterGallery from "../components/home/BeforeAfterGallery"
import ProcessSection from "../components/home/ProcessSection"
import ReviewsSection from "../components/home/ReviewsSection"
import ServiceAreaSection from "../components/home/ServiceAreaSection"
import CTASection from "../components/home/CTASection"

export default function Home(){
  return (
    <div>
      <HeroSection/>
      <TrustSection/>
      <ServicesSection/>
      <BeforeAfterGallery/>
      <ProcessSection/>
      <ReviewsSection/>
      <ServiceAreaSection/>
      <CTASection/>
    </div>
  )
}
`)

/* ---------- APP ---------- */

write("src/App.jsx", `
import React from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"

import Home from "./pages/Home"

export default function App(){
 return(
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
   </Routes>
  </BrowserRouter>
 )
}
`)

/* ---------- MAIN ---------- */

write("src/main.jsx", `
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")).render(
 <React.StrictMode>
  <App/>
 </React.StrictMode>
)
`)

/* ---------- HTML ---------- */

write("index.html", `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Grip City Handyman</title>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
</head>

<body>
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
</body>
</html>
`)

/* ---------- PACKAGE ---------- */

write("package.json", `
{
 "name":"grip-city-handyman",
 "private":true,
 "version":"1.0.0",
 "type":"module",
 "scripts":{
  "dev":"vite",
  "build":"vite build"
 },
 "dependencies":{
  "react":"^18.2.0",
  "react-dom":"^18.2.0",
  "react-router-dom":"^6.22.3",
  "framer-motion":"^11.0.0",
  "lucide-react":"^0.344.0"
 },
 "devDependencies":{
  "vite":"^5.0.0",
  "@vitejs/plugin-react":"^4.2.0"
 }
}
`)

console.log("Grip City Handyman site created.")
