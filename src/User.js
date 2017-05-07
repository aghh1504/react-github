import React from 'react'

const User = ({userdata}) => {
  return (
    <div>
        {
          userdata.map(userdata => {
            return (
              <div>
                {userdata.avatar_url && <li className="list-group-item"> <img src={userdata.avatar_url} className="img-rounded img-responsive"/></li>}
                {userdata.name && <li className="list-group-item">Name: {userdata.name}</li>}
                {userdata.login && <li className="list-group-item">Username: {userdata.login}</li>}
                {userdata.email && <li className="list-group-item">Email: {userdata.email}</li>}
                {userdata.location && <li className="list-group-item">Location: {userdata.location}</li>}
                {userdata.company && <li className="list-group-item">Company: {userdata.company}</li>}
                {userdata.followers && <li className="list-group-item">Followers: {userdata.followers}</li>}
                {userdata.following && <li className="list-group-item">Following: {userdata.following}</li>}
                {userdata.following && <li className="list-group-item">Public Repos: {userdata.public_repos}</li>}
                {userdata.blog && <li className="list-group-item">Blog: <a href={userdata.blog}> {userdata.blog}</a></li>}
              </div>
            )
          })
        }
      </div>
  )
}

export default User;
