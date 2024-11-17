import React, { useEffect, useState, useContext } from 'react'
import Logo from './Logo'
import fetch from '../../apis/fetch'
import { useNavigate, Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';

function Header(props) {
  const [user, setJUser] = useState(null);
  const [isHidden, setIsHidden] = useState(true);
  const itemsStyle = 'bg-white hover:bg-gray-200 text-black p-2 cursor-pointer rounded'
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setJUser(props.user);
  }, [props.user])

  async function handleLogOut() {
    await fetch.post('/logout');
    setUser(null);
    navigate('/login')
  }

  return (
    <header className=' absolute left-0 top-0 w-screen h-14 bg-primary flex justify-between p-3 shadow-lg z-50'>
      <div className="logo flex gap-2 pl-10 cursor-pointer" onClick={() => navigate('/')} >
        <Logo />
        <h2 className='text-2xl font-bold'>Syncade</h2>
      </div>
      {user !== null &&
      <div className='pr-10 flex justify-center'>
        <Link to={'/new/project'} className='bg-white hover:bg-slate-200 text-primary text-center mr-4 px-2 rounded-md text-xl font-medium'>Create new Project</Link>
        <ul className='flex flex-col shadow-2xl z-10'>
          <li className='text-xl cursor-pointer font-medium hover:text-slate-200' onClick={() => setIsHidden(!isHidden)}>
            {user.name} {user.surname} &#11167;
          </li>
          <Link to={`/profile/${user.id}`} hidden={isHidden} className={itemsStyle} >My profile</Link>
          <li hidden={isHidden} className={itemsStyle + ' text-red-700 z-50'} onClick={handleLogOut} >
            Log out
          </li>
        </ul>
      </div>
      }
    </header>
  )
}

export default Header