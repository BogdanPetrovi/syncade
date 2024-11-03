import React from 'react'
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './index.css';
import { UserContextProvider } from './context/UserContext';

function App() {
  return (
    <UserContextProvider>
      <div>
        <RouterProvider router={router} />
      </div>
    </UserContextProvider>
  )
}

export default App
