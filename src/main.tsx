import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "maplibre-gl/dist/maplibre-gl.css";
import './utils/i18.ts';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
    <ToastContainer position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      limit={3} />
  </BrowserRouter>,
)
