import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { user, teams, projects, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <Header user={user} />
      <div className="grid grid-cols-[192px_auto] max-w-full min-h-screen h-fit">
        <Sidebar teams={teams} projects={projects} />
        <Main projects={projects} />
      </div>
    </>
  );
}

export default Home;