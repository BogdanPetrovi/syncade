import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import verify from '../components/isAuthenticated';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import fetch from '../apis/fetch';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function checkIsAuthenticated() {
      const result = await verify();
      if(!result) navigate('/login')
      setUser(result);
      const teams = await fetch.get('/user/teams');
      setTeams(teams.data.teams.rows);
      teams.data.teams.rows.map(async (team) => {
        const newProjects = await fetch.get(`/team/projects/${team.id}`)
        setProjects(projects => [...projects, ...newProjects.data.projects.rows])
      })
    }

    checkIsAuthenticated();
  }, [navigate])


  return (
    <>
      <Header user={user} />
      <div className="grid grid-cols-[192px_auto] max-w-full min-h-screen h-fit">
        <Sidebar teams={teams} projects={projects} />
        <Main projects={projects} />
      </div>
    </>
  )
}

export default Home
