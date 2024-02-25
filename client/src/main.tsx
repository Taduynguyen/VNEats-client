import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import { BrowserRouter as Route } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Route>
      <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithNavigate>
        <AppRoutes />
      </Auth0ProviderWithNavigate>
      </QueryClientProvider>
      
      
    </Route>
  </React.StrictMode>,
)
