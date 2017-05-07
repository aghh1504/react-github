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
      repos: []
    }
  }
  onChange = (e) => {
    this.setState({value: e.target.value})
  }
   getRepos = (username) =>{
  return axios.get(`https://api.github.com/users/${username}/repos`);
  }

  getUserInfo = (username) => {
  return axios.get(`https://api.github.com/users/${username}`);
  }

  onSubmit = (e) => {
    e.preventDefault()
  return  axios
      .all([this.getRepos(this.state.value), this.getUserInfo(this.state.value)])
      .then(response => {
        this.setState({
          items: [...this.state.items, response[1].data],
          repos: [...this.state.repos, ...response[0].data],
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
        <div className="row">
        <div className="col-md-4">
          <User userdata={this.state.items}/>
        </div>
        <div className="col-md-4">
          <Repos repos={this.state.repos}/>
        </div>
        <div className="col-md-4">
          <Notes />
        </div>
      </div>
      </div>
    );
  }
}

export default App;
