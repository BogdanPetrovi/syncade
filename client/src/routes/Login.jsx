import React, { useEffect, useState } from 'react'
import fetch from '../apis/fetch';
import { useNavigate } from 'react-router-dom';
import verify from '../components/isAuthenticated';
import Input from '../components/Input';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const inputStyles = 'w-96 h-12 rounded-md mb-6 text-xl p-2 text-black ';
  const navigate = useNavigate();

  useEffect(() => {
    async function checkIsAuthenticated() {
      const result = await verify();
      if(result) navigate('/')
    }
    checkIsAuthenticated();
  }, [navigate])


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await fetch.post('/login', {
        email,
        password
      });
      if(result.data.status === "success") navigate('/')
    } catch (err) {
      if(err.status === 401 || err.status === 400) {
        setErr('Incorrect email or password')
        setPassword('');
      }
    }
  } 
  

  return (  
    <div className='flex justify-center items-center w-full h-screen bg-gradient-to-bl from-primary via-primary to-secondary'>
      <div className='w-6/12 h-3/5 rounded backdrop-blur-xl bg-white/20 flex flex-col items-center p-3 pt-20'>
        <h3 className='text-3xl font-bold'>Login</h3>
        {err !== null && <h3 className='text-red-600 text-2xl mt-5'>{err}</h3>}
        <form className='flex flex-col items-center h-2/3 mt-5 w-full' onSubmit={handleSubmit}>
          <Input name={email} labelText={'Email'} handleChange={e => setEmail(e.target.value)} value={email} type={'email'} />
          <Input name={'password'} labelText={'Password'} handleChange={(e) => setPassword(e.target.value)} value={password} type={'password'} />
          <input type="submit" value="Submit" className={inputStyles + 'bg-primary cursor-pointer text-white'} />
        </form>
        <h4 className='text-xl'>Don't have an account? <span className='text-secondary cursor-pointer' onClick={() => navigate('/register')}>Sign up</span></h4>
      </div>      
    </div>
  )
}

export default Login
