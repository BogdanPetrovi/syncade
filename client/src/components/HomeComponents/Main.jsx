import React, { useEffect, useState } from 'react'
import PriorityCategories from './PriorityCategories';

function Main(props) {
  const [highPriority, setHighPriority] = useState([]);
  const [mediumPriority, setMediumPriority] = useState([]);
  const [lowPriority, setLowPriority] = useState([]);

  useEffect(() => {
    const filteredHigh = props.projects.filter(project =>{
      return project.priority === "High" && project.status !== "Done";
    })
    setHighPriority(filteredHigh);
    const filteredMedium = props.projects.filter(project =>{
        return project.priority === "Medium" && project.status !== "Done";
    })
    setMediumPriority(filteredMedium);
    const filteredLow = props.projects.filter(project =>{
      return project.priority === "Low" && project.status !== "Done";
    })
    setLowPriority(filteredLow);
  }, [props])

  return (
    <div className='flex flex-col mt-14 p-5 overflow-y-scroll'>
      <PriorityCategories 
        color={'text-red-700'}
        priority={'High'}
        projects={highPriority}
      />
      <PriorityCategories 
        color={'text-orange-600'}
        priority={'Medium'}
        projects={mediumPriority}
      />
      <PriorityCategories 
        color={'text-green-700'}
        priority={'Low'}
        projects={lowPriority}
      />
    </div>
  )
}

export default Main
