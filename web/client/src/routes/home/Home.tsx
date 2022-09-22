import { Maybe, isSome } from 'common/types/maybe';
import React, { useEffect, useState } from 'react';
import logo from '../../static/images/logo/logo.svg'
import './Home.scss'

export const Home: React.FC = () => {
  const [data, setData] = useState<Maybe<{ message: string }>>();

  useEffect(() => {
    fetch('https://fastapi-production-e81d.up.railway.app')
      .then(response => response.json())
      .then(json => setData(json))
  }, [])
  
  console.log(data);

  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <p>Hello, world!</p>
        <p>
          Edit <code>Home.tsx</code> and save to test HMR updates.
        </p>
        {
          isSome(data) ? <p>{data.message}</p> : null
        }
        <p>
          <a
            className="Home-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="Home-link"
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
}
