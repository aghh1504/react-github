import React, { Component }  from 'react'
import Profile from './Profile'
import Repos from './Repos'
import Notes from './Notes'
import axios from 'axios'

class User extends Component {
  constructor({user}) {
    super()
    this.state = {
      username: user,
      ready: false,
      info: {},
      repos: [],
      notes: []
    }
  }

  componentWillMount() {
    this.getData({forceUpdate: false});
  }

  getData = ({forceUpdate = false} = {}) => {
    this.setState({
      ready: false
    });
    const url = `/users/${this.state.username}${forceUpdate ? '?force=true' : ''}`;

    axios.get(url)
      .then(({data}) => {
        this.setState({
          ready: true,
          info: data.info || {},
          repos: data.repos || [],
          notes: data.notes || []
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    if(this.state.ready ) {
      return (
        <div className="tab-content">
          <a href='#' onClick={() => this.getData({forceUpdate: true})}> Refresh </a>
          <div className="user tab-panel" id={this.state.username} role="tabpanel">
            <Profile userdata={this.state.info} />
            <Repos repos={this.state.repos} />
            <Notes username={this.state.username} />
          </div>
        </div>
      );
    } else {
      return <div> Loading... </div>;
    }

  }
}





      //  if(this.state.ready) {
      //    return (
      //      <div>
      //        <a href='#' onClick={() => this.getData({forceUpdate: true})}> Refresh </a>
      //        <Profile userdata={this.state.info} />
      //        <Repos repos={this.state.repos} />
      //        <Notes username={this.state.username} />
      //      </div>
      //    );
      //  } else {
      //    return <div> Loading... </div>;
      //  }


export default User;
