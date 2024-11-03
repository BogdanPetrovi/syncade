import React, { useState, useEffect } from 'react';
import verify from '../components/Authentication/isAuthenticated';
import Input from '../components/LoginRegisterComponents/Input';
import fetch from '../apis/fetch';
import { useNavigate } from 'react-router-dom';

function Register() {
  const inputStyles = 'w-96 h-12 rounded-md mb-6 text-xl p-2 text-black ';
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkIsAuthenticated() {
      const result = await verify();
      if(result) navigate('/')
    }
    checkIsAuthenticated();
  }, [navigate])

  function isEnabled(e) {
    const confirmPw = e.target.value;
    if(confirmPw === password && email !== '' && name !== '' && surname !== ''){
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const result = await fetch.post('/register', {
        name,
        surname,
        email,
        password
      })
      if(result.data.status === "success") navigate('/');
    } catch (err) {
      if(err.status === 400) setErr(err.response.data.errors[0].msg);
      if(err.status === 500) navigate('/login')
    }
  } 

  return (
    <div className='flex justify-center items-center w-full h-screen bg-gradient-to-bl from-primary via-primary to-secondary'>
      {err !== null && <h1 className='text-red-700 bg-white p-3 text-4xl mr-2 rounded-md'>{err}</h1>}
      <div className='w-6/12 h-3/4 rounded backdrop-blur-xl bg-white/20 flex flex-col items-center p-3'>
        <h3 className='text-3xl font-bold'>Register</h3>
        <form className='flex flex-col items-center mt-5 w-full' onSubmit={handleSubmit}>
          <Input name={'name'} labelText={'First name'} handleChange={(e) => setName(e.target.value)} value={name} minLength={2} />
          <Input name={'surname'} labelText={'Last name'} handleChange={(e) => setSurname(e.target.value)} value={surname} minLength={3} />
          <Input name={'email'} labelText={'Email address'} handleChange={(e) => setEmail(e.target.value)} value={email} type={'email'} />
          <Input name={'password'} labelText={'Password'} handleChange={(e) => setPassword(e.target.value)} value={password} type={'password'} minLength={8} />
          <Input name={'confirmpw'} labelText={'Confirm your password'} handleChange={(e) => isEnabled(e)} type={'password'} />
          <input type="submit" value="Submit" className={inputStyles + 'bg-primary cursor-pointer text-white disabled:bg-disabled disabled:cursor-default'} disabled={isValid} />
          <h4 className='text-xl'>Already have an account? <span className='text-secondary cursor-pointer' onClick={() => navigate('/login')}>Log in</span></h4>
        </form>
      </div>      
    </div>
  )
}

export default Register