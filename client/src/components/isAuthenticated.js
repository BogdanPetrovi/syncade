import fetch from '../apis/fetch';

async function verify(){
  const result = await fetch.get('/validate', { withCredentials: true, credentials: 'include' })
  if(result.data.authenticated) return result.data.user;
  else {
    return false;
  } 
}

export default verify
