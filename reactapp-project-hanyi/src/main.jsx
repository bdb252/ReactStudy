import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, HashRouter} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <HashRouter basename='/'>
    <App />
  </HashRouter>
)
