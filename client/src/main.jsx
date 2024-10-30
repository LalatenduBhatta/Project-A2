import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { AuthContextWrapper } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextWrapper>
      <RouterProvider router={router} />
    </AuthContextWrapper>
  </StrictMode>,
)
