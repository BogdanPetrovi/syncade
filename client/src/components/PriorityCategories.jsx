import React from 'react'
import ProjectCard from './ProjectCard';

function PriorityCategories(props) {
  return (
    <>
      <h2 className={'text-3xl font-bold ' + props.color}>{props.priority} Priority Projects and Tasks</h2>
      <div className="mt-2 mb-7 flex flex-wrap content-start gap-5">
        {props.projects && 
          props.projects.map(project => (
            <ProjectCard 
              title={project.project_name} 
              status={project.status} 
              deadline={project.deadline} 
              description={project.project_description}
              key={project.id}  />
          ))
        }
      </div>
    </>
  )
}

export default PriorityCategories
