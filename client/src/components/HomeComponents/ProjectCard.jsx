import React, { useEffect, useState } from 'react'

function ProjectCard(props) {
  const [date, setDate] = useState('');

  useEffect(() => {
    const date = new Date(props.deadline);
    setDate(date.toDateString().slice(4));
  }, [props])

  return (
    <div className='bg-secondary h-64 w-80 rounded-lg p-3 overflow-hidden flex flex-col justify-between cursor-default'>
      <h2 className='text-xl font-bold mb-1'>{props.title}</h2>
      <div>  
        <h3 className='text-lg'>Status: <span className='text-primary'>{props.status}</span></h3>
        <h3 className='text-lg'>Deadline: <span className='text-primary'>{date}</span></h3>
        <h3 className='text-lg line-clamp-3'>Description: <span className='text-primary'>{props.description}</span></h3>
      </div>
      <h3 className='text-xl underline hover:text-gray-200 w-fit cursor-pointer ml-auto'>See more &#62;&#62;&#62;</h3>
    </div>
  )
}

export default ProjectCard
