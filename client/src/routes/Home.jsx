import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import verify from '../components/isAuthenticated';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkIsAuthenticated() {
      const result = await verify();
      if(!result) navigate('/login')
      setUser(result);
    }
    checkIsAuthenticated();
  }, [navigate])


  return (
    <>
      <Header user={user} />
      <Sidebar />
    </>
  )
}

export default Home
