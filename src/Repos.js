import React from 'react'

const Repos = ({repos}) => {
  return (
    <div>
      <ul className='list-group'>
        {repos.map((repo,i) => {
          return (
            <li className='list-group-item' key={i}>
              {repo.html_url && <h4><a href={repo.html_url}>{repo.name}</a></h4>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Repos;
