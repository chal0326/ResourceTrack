// app/routes/index.tsx
import { Link } from '@remix-run/react';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App.tsx';
import '../index.css';


export default function Index() {
  return (
    createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)  
  );
}
