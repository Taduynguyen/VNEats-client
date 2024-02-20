import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Route } from 'react-router-dom'
import AppRoutes from './AppRoutes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Route>
      <AppRoutes />
    </Route>
  </React.StrictMode>,
)
