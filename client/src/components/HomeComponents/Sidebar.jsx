import React, { useEffect, useState } from 'react'
import SidebarProjects from './SidebarProjects';

function Sidebar(props) {
  const [teams, setTeams] = useState(null);
  const [toDo, setToDo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    setTeams(props.teams);
    const filteredToDo = props.projects.filter(project =>{
      return project.status === "To Do";
    })
    setToDo(filteredToDo);
    const filteredInProgress = props.projects.filter(project =>{
        return project.status === "In Progress";
    })
    setInProgress(filteredInProgress);
    const filteredDone = props.projects.filter(project =>{
      return project.status === "Done";
    })
    setDone(filteredDone);
    },[props])
  
  return (
    <div className='bg-blue-300 h-full pt-5 px-2'>
      <h2 className='font-bold'>Teams you are in:</h2>
      {teams !== null && teams.map((team) => (
        <h2 className='max-w-12 lg:max-w-44 pl-1' key={team.id}>{team.team_name}</h2>
      ))
      }
      <h2 className='font-bold mt-6'>Projects and tasks:</h2>
      <SidebarProjects name={"To do"} projects={toDo.slice(0, 3)} first={true} />
      <SidebarProjects name={"In progress"} projects={inProgress.slice(0, 3)} />
      <SidebarProjects name={"Done"} projects={done.slice(0, 3)} />
    </div>
  )
}
export default Sidebar