import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Application from './components/Application.jsx'
import { AuthProvider } from './components/Context/AuthContext.jsx'
import IndexPage from './components/index/IndexPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    {/* <Login></Login> */}
    <AuthProvider>
    {/* <Application></Application> */}
    <App></App> 
    {/* <IndexPage></IndexPage> */}
    </AuthProvider>
    </StrictMode>,
)
