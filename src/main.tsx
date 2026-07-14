import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { SoundProvider } from "@/components/sound/sound-provider"
import App from "./App"
import "./globals.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SoundProvider>
          <App />
        </SoundProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
