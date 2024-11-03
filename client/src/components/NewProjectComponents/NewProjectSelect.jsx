import React from 'react'

function NewProjectSelect(props) {
  return (
    <div className='relative'>
      <span className='absolute -top-3 left-4 bg-white px-2 text-primary'>
        {props.displayName}
      </span>
      <select
        name={props.name}
        value={props.data}
        onChange={props.handleChange}
        className='w-full p-2 text-black border-2 border-primary rounded-lg focus:outline-none focus:border-primary-focus'
      >
        <option className='text-red-600 font-bold' value={props.option1}>{props.option1}</option>
        <option className='text-orange-600 font-bold' value={props.option2}>{props.option2}</option>
        <option className='text-green-600 font-bold' value={props.option3}>{props.option3}</option>
      </select>
    </div>
  )
}

export default NewProjectSelect
