import React from 'react'

function SidebarProjects(props) {
  return (
    <>
      <h2 className={'pl-1 font-semibold ' + (props.first ? 'mt-0' : 'mt-8')}>{props.name}</h2>
      <div className="divide-y divide-primary">
        {props.projects &&
          props.projects.map(project => ( 
            <h2 
              className='px-2 border-b-white underline cursor-pointer hover:text-gray-200' 
              key={project.id}>{project.project_name}</h2> 
          )) 
        }
      </div>
    </>
  )
}

export default SidebarProjects
