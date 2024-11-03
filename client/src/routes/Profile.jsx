import React, { useEffect, useState, useContext } from 'react'
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import fetch from '../apis/fetch';
import Sidebar from '../components/Sidebar';

function Profile() {
  const { user, teams, projects, loading } = useContext(UserContext)
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const headingStyle = 'text-primary font-bold text-3xl mt-5';
  const underHeadingStyle = 'text-primary font-medium text-2xl pl-2'

  useEffect(() => {
    if(!loading){
      if(user === null) navigate('/login')
    }

    async function checkProfile(){
      const userId = id;
      const result = await fetch.get(`/user/${userId}`);
      if(result.data.data.rows.length > 0) setUserProfile(result.data.data.rows);
    }

    checkProfile();
  }, [navigate, id, user, loading])

  return (
    <>
      <Header user={user} />
      <div className="grid grid-cols-[192px_auto] max-w-full min-h-screen h-fit">
        <Sidebar teams={teams} projects={projects} />
          {userProfile ?
            <div className='container mx-auto w-4/5 lg:h-2/4 h-max mt-5 p-3 rounded-xl border-4 border-primary'>
             <h2 className={headingStyle + 'mt-0'}>Full name</h2>
             <h2 className={underHeadingStyle}>{userProfile[0].name} {userProfile[0].surname}</h2>
             <h2 className={headingStyle}>Email</h2>
             <h2 className={underHeadingStyle}>{userProfile[0].email}</h2>
             <h2 className={headingStyle}>Role</h2>
             <h2 className={underHeadingStyle}>{userProfile[0].role}</h2>
             <h2 className={headingStyle}>Teams</h2>
             {userProfile.map( team => (
              <h2 key={team.team_id} className={underHeadingStyle}>{team.team_name}</h2>
             ))}
            </div> 
            :
            <h1 className='text-7xl text-black place-self-center'>User doesn't exists!</h1>
            }
      </div>
    </>
  )
}

export default Profile