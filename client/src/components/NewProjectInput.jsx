import React from 'react'

function NewProjectInput(props) {
  return (
    <div className='relative'>
      <span className='absolute -top-3 left-4 bg-white px-2 text-primary'>
       {props.displayName}
      </span>
      <input
        type={props.type}
        name={props.name}
        value={props.data}
        onChange={props.handleChange}
        min={props.min}
        max={props.max}
        className='w-full p-2 text-black border-2 border-primary rounded-lg focus:outline-none focus:border-primary-focus'
      />
  </div>
  )
}

export default NewProjectInput
