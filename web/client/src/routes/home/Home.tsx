import logo from '../../static/images/logo/logo.svg'
import './Home.scss'

export const Home: React.FC = () => (
  <div className="Home">
    <header className="Home-header">
      <img src={logo} className="Home-logo" alt="logo" />
      <p>Hello, world!</p>
      <p>
        Edit <code>Home.tsx</code> and save to test HMR updates.
      </p>
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
