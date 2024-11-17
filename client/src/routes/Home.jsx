import React, { useContext, useEffect } from 'react';
import Header from '../components/HeaderComponents/Header';
import Sidebar from '../components/HomeComponents/Sidebar';
import Main from '../components/HomeComponents/Main';
import ProjectViewer from '../components/HomeComponents/ProjectViewer';
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
      <div className="grid grid-cols-[192px_auto] max-w-full max-h-screen h-screen overflow-hidden relative">
        <Sidebar teams={teams} projects={projects} />
        <Main projects={projects} />
        <ProjectViewer />
      </div>
    </>
  );
}

export default Home;