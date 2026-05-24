import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import AuthProvider, { AuthContext } from './context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   

    <Toaster position="top-right" />

     <AuthProvider>

       <App />
     </AuthProvider>
    

   
   
  </BrowserRouter>
  
  
)
