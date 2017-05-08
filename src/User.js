import React from 'react'
import Profile from './Profile'
import Repos from './Repos'

const User = ({user}) => {
  return (
    <div className="user tab-pane" id={user.info.login} role="tabpanel">
      <Profile userdata={user.info}/>
      <Repos repos={user.repos}/>
    </div>
  )
}

export default User;
