import { createBrowserRouter } from 'react-router-dom';
import Login from './routes/Login';
import Home from './routes/Home';
import Register from './routes/Register';

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> }
])