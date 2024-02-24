import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WalletContextProvider } from './components/index.tsx'
import { AppProvider } from "@/context";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <WalletContextProvider>
    <AppProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AppProvider>
  </WalletContextProvider>

)
