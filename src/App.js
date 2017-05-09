import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import User from './User'
import Repos from './Repos'
import Notes from './Notes'
import Search from './Search'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  addUser = (user) => {
    console.log('adding user', user, this.state.users);
    if(!this.state.users.includes(user)) {
      this.setState({
        users: [...this.state.users, user]
      });
    } else {
      console.error('user already initialiazed')
    }
  }
  // <ul className="nav nav-tabs" role="tablist">
  //   {
  //     this.state.users.map((user,i) => {
  //     return (
  //       <li className="nav-item">
  //         <a className="nav-link" data-toggle="tab" href={'#' + user.info.login} role="tab">{user.info.login}</a>
  //       </li>
  //       )
  //     })
  //   }
  // </ul>
//return  <User user={user} key={i} />
  render() {
    return (
      <div className="App">
        <Search onSearch={this.addUser} />

        <div className="tab-content2">
          {
            this.state.users.map((user,i) => {
              return <User user={user} key={i} />
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
