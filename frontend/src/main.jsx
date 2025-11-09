import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './/index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { BlogProvider } from './context/BlogContext.jsx'
import {Toaster} from "react-hot-toast"
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <AuthProvider>
    <ThemeProvider>
      <BlogProvider>
        <App />
         <Toaster position="top-right" />
      </BlogProvider>
    </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
 
)
