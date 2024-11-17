import { createBrowserRouter } from 'react-router-dom';
import Login from './routes/Login';
import Home from './routes/Home';
import Register from './routes/Register';
import Profile from './routes/Profile';
import NewProject from './routes/NewProject';
import ProtectedRoute from './components/Authentication/ProtectedRoute';
import PublicRoute from './components/Authentication/PublicRoute';
import ViewProject from './routes/ViewProject';

export const router = createBrowserRouter([
  { path: '/', element: <ProtectedRoute><Home /></ProtectedRoute> },
  { path: '/login', element: <PublicRoute><Login /></PublicRoute> },
  { path: '/register', element: <PublicRoute><Register /></PublicRoute> },
  { path:'/profile/:id', element: <ProtectedRoute><Profile /></ProtectedRoute> },
  { path:'/new/project', element: <ProtectedRoute><NewProject /></ProtectedRoute> },
  { path:'/project/:id', element: <ProtectedRoute><ViewProject /></ProtectedRoute> }
])