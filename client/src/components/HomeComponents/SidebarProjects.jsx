import React from 'react'
import { Link } from 'react-router-dom';

function SidebarProjects(props) {
  return (
    <>
      <h2 className={'pl-1 font-semibold ' + (props.first ? 'mt-0' : 'mt-8')}>{props.name}</h2>
      <div className="divide-y divide-primary">
        {props.projects &&
          props.projects.map(project => ( 
            <Link 
              className='px-2 underline hover:text-gray-200 block' 
              key={project.id}
              to={`/project/${project.id}`}>
                {project.project_name}
            </Link> 
          )) 
        }
      </div>
    </>
  )
}

export default SidebarProjects
