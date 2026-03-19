import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TravelerProvider } from './features/travelers/TravelerProvider.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TravelerProvider>
        <App />
      </TravelerProvider>
    </BrowserRouter>
  </StrictMode>,
)
