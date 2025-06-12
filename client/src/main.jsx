import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { ProjectProvider } from './context/ProjectContext'
import router from './Routes'
import './index.css'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProjectProvider>
        <RouterProvider router={router} />
      </ProjectProvider>
    </AuthProvider>
  </StrictMode>,
)
