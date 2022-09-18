import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { UserContextWrapper } from './components/helpers/UserContextWrapper'
import { AppRouter } from './router'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextWrapper>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </UserContextWrapper>
  </React.StrictMode>
)
