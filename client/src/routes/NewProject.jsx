import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/HeaderComponents/Header';
import NewProjectInput from '../components/NewProjectComponents/NewProjectInput';
import NewProjectSelect from '../components/NewProjectComponents/NewProjectSelect';
import fetch from '../apis/fetch';

function NewProject() {
  const { user, loading } = useContext(UserContext)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    status: 'To Do',
    priority: 'Medium',
    deadline: ''
  });
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if(!loading){
      if(user === null) navigate('/login')
    }
  },[user, navigate, loading])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch.post('/new/project', {
        name: formData.projectName,
        description: formData.projectDescription,
        status: formData.status,
        priority: formData.priority,
        deadline: formData.deadline
      })
      console.log(result)
      if(result.status !== 400) return navigate('/')
    } catch (err) {
      console.log(err);
      setErrors(err.response.data.errors)
    } 
  };

  return (
    <div className='max-h-screen h-screen overflow-hidden relative'>
      <Header user={user} />
      <div className='w-full m-0'>
        <div className='lg:w-1/2 w-3/4 mx-auto'>
          <form onSubmit={handleSubmit} className='space-y-4 mt-20 border-4 border-primary  h-fit p-7 rounded-2xl'>
          {
            errors && errors.map(err => (
              <h1 className='text-red-800 font-bold mx-auto text-xl'>{err.msg}</h1>
            ))
          } 
            <NewProjectInput 
              displayName={'Project name'}
              type='text'
              name={'projectName'}
              data={formData.projectName}
              handleChange={handleChange}
            />

            <div className='relative'>
              <span className='absolute -top-3 left-4 bg-white px-2 text-primary'>
                Project description
              </span>
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                minLength={5}
                className='w-full p-2 text-black border-2 border-primary rounded-lg focus:outline-none focus:border-primary-focus resize-y min-h-[70px] max-h-[300px]'
              />
            </div>

            <NewProjectSelect 
              displayName={'Status'}
              name={'status'}
              data={formData.status}
              handleChange={handleChange}
              option1={'To Do'}
              option2={'In Progress'}
              option3={'Done'}            
            />

            <NewProjectSelect 
              displayName={'Priority'}
              name={'priority'}
              data={formData.priority}
              handleChange={handleChange}
              option1={'High'}
              option2={'Medium'}
              option3={'Low'}            
            />

            <NewProjectInput 
              displayName={'Deadline'}
              type='date'
              name={'deadline'}
              data={formData.deadline}
              min={'2024-05-01'}
              max={'2025-12-31'}
              handleChange={handleChange}
            />

            <button 
              type="submit" 
              className='w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-focus transition-colors duration-200'
            >
              Create Project
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewProject