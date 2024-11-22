import React from 'react'

function ProjectViewer() {
  return (
    <div className='fixed left-[60%] top-20 h-3/4 w-3/5 shadow-2xl p-6 z-40 bg-white'>
      <div className='absolute top-10 -left-10 w-10 p-3 rounded-xl bg-white cursor-pointer rounded-e-none duration-500 hover:bg-gray-200'>
        <h1 className='text-black text-2xl'>X</h1>
      </div>
      <h4 className='text-lg text-gray-400 font-light mb-3'>Development team</h4>
      <h1 className='text-black text-3xl font-bold mb-10'>Ime projekta</h1>
      <div className='w-1/3 flex justify-between mb-8'>
        <h3 className='text-xl text-gray-400'>Status</h3>
        <div className="w-36">
        <h3 className='text-xl text-black font-medium'>To Do &#8986;</h3> {/* &#9203; hourglass  &#10004; checkmark */}
        </div>
      </div>
      <div className='w-1/3 flex justify-between mb-8'>
        <h3 className='text-xl text-gray-400'>Pirority</h3>
        <div className="w-36">
        <h3 className='text-xl text-black font-medium'>High <span className='text-red-700'>&#9888;</span></h3>
        </div>
      </div>
      <div className='w-1/3 flex justify-between mb-8'>
        <h3 className='text-xl text-gray-400'>Due date</h3>
        <div className="w-36">
        <h3 className='text-xl text-black font-medium'>15.11.2024 &#128197;</h3>
        </div>
      </div>
      <div className='w-1/3 flex justify-between mb-8'>
        <h3 className='text-xl text-gray-400'>Responsible</h3>
        <div className="w-36">
        <h3 className='text-xl text-black font-medium'>Pera Perovic</h3>
        </div>
      </div>
      <div className='flex flex-col mb-8 w-[60%]'>
        <h3 className='text-xl text-gray-400'>Description</h3>
        <h3 className='text-xl text-black'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque massa ex, eleifend nec rhoncus non, laoreet a neque. Nulla sodales tempus sapien, eget bibendum urna tempus vitae.</h3>
      </div>
      <div className='w-2/3'>
      <h3 className='text-xl text-gray-400'>In project</h3>
      <table className="table-fixed text-black w-full">
        <thead>
          <tr>
            <th>Full name</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          <tr>
            <td>Pera Perovic</td>
            <td>Development team</td>
         </tr>
          <tr>
          <td>Pera Perovic</td>
          <td>Development team</td>
          </tr>
          <tr>
          <td>Pera Perovic</td>
          <td>Development team</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default ProjectViewer
