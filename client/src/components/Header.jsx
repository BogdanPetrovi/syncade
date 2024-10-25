import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import fetch from '../apis/fetch'
import { useNavigate } from 'react-router-dom'

function Header(props) {
  const [user, setUser] = useState(null);
  const [isHidden, setIsHidden] = useState(true);
  const itemsStyle = 'bg-white hover:bg-gray-200 text-black p-2 cursor-pointer rounded'
  const navigate = useNavigate();

  useEffect(() => {
    setUser(props.user);
  }, [props.user])

  async function handleLogOut() {
    await fetch.post('/logout');
    navigate('/login')
  }

  return (
    <header className='w-screen h-14 bg-primary flex justify-between p-3 shadow-lg'>
      <div className="logo flex gap-2 pl-10 cursor-pointer" onClick={() => navigate('/')} >
        <Logo />
        <h2 className='text-2xl font-bold'>Syncade</h2>
      </div>
      {user !== null &&
      <div className='pr-10 flex flex-col'>
        <ul className='flex flex-col shadow-2xl z-10'>
          <li className='text-xl cursor-pointer font-medium' onClick={() => setIsHidden(!isHidden)}>
            {user.name} {user.surname} &#11167;
          </li>
          <li hidden={isHidden} className={itemsStyle} >My profile</li>
          <li hidden={isHidden} className={itemsStyle + ' text-red-700'} onClick={handleLogOut} >
            Log out
          </li>
        </ul>
      </div>
      }
    </header>
  )
}

export default Header