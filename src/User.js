import React, { Component }  from 'react'
import Profile from './Profile'
import Repos from './Repos'
import Notes from './Notes'
import axios from 'axios'

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      users: []
    }
  }

  onChange = (e) => {
    this.setState({value: e.target.value})
  }

  getUserInfo = (username) => {
  return axios.get(`/users/${username}`);
  }

  onSubmit = (e) => {
    e.preventDefault()
  return this.getUserInfo(this.state.value)
      .then(response => {
        console.log(response)
        this.setState({
          users: [...this.state.users, response.data],
          value: ''
        })

      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.onSubmit}>
        <input value={this.state.value} onChange={this.onChange}/>
        <button>Search</button>
        </form>
        <ul className="nav nav-tabs" role="tablist">
          {
            this.state.users.map((user,i) => {
            return (
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href={'#' + user.info.login} role="tab">{user.info.login}</a>
              </li>
              )
            })
          }
        </ul>
        <div className="tab-content">
          {
            this.state.users.map((user,i) => {
            return  (
              <div className="user tab-pane" id={user.info.login} role="tabpanel">
                <Profile userdata={user.info} key={i} />
                <Repos repos={user.repos}/>
              </div>
            )
            })
          }
        </div>
        <div className="col-md-4">
          <Notes />
        </div>
      </div>
    );
  }
}

export default User;
