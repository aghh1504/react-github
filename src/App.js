import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import User from './User'
import Repos from './Repos'
import Notes from './Notes'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      items: [],
      repos: [],
      notes: this.props.notes,
      users: []
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/users")
      .then(response => {
        this.setState({
          items: [...response.data]
        });
      })
      .catch(err => console.log(err));
  }

  onChange = (e) => {
    this.setState({value: e.target.value})
  }
   getRepos = (username) =>{
  return axios.get(`/users/${username}`);
  }

  getUserInfo = (username) => {
  return axios.get(`/users/${username}`);
  }
  setUser = (repos, items) => {
    const userData = {
      repos,
      items
    }
   return axios.post(`/new`, userData);
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
    console.log(this.state.items, this.state.repos);
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
            return (
              <User user={user} key={i} />
            )
          })
        }
        <div className="col-md-4">
          <Notes />
        </div>
      </div>
      </div>
    );
  }
}

export default App;
