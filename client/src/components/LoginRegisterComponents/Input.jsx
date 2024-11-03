import React from 'react'

function Input(props) {
  const inputStyles = 'w-96 h-12 rounded-md mb-6 text-xl p-2 text-black ';

  return (
    <>
      <label htmlFor={props.name} className='text-xl'>{props.labelText}</label>
      <input type={props.type || 'text'}
              id={props.name}
              className={inputStyles} 
              onChange={e => props.handleChange(e)} 
              value={props.value} 
              minLength={props.minLength || 0} 
              required />
    </>
  )
}

export default Input
