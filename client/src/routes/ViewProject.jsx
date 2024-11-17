import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useParams } from 'react-router-dom';
import fetch from '../apis/fetch';
import Header from '../components/HeaderComponents/Header';

function ViewProject() {
  const { user } = useContext(UserContext);
  const {id} = useParams();
  const [project, setProject] = useState();
  
  useEffect(() => {
    async function getProject() {
      const projectData = await fetch(`/project/${id}`);
      setProject(projectData);
      console.log(projectData);
    }

    getProject();
  }, [fetch, setProject, id])

  return (
    <div>
      <Header user={user} />
    </div>
  )
}

export default ViewProject
