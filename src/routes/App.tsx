import { useState } from 'react'
// import logo from '../static/images/logo/logo.svg'
import './App.scss'

export const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <img src="../static/images/logo/logo.svg" className="App-logo" alt="logo" />
      <p>Hello, world!</p>
      <p>
        Edit <code>App.tsx</code> and save to test HMR updates.
      </p>
      <p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {' | '}
        <a
          className="App-link"
          href="https://vitejs.dev/guide/features.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vite Docs
        </a>
      </p>
    </header>
  </div>
)
