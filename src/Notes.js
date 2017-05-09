import React, {Component} from 'react'
import axios from 'axios'

export default class Notes extends Component{
  constructor({username}) {
    super()
    this.state = {
      username,
      value: '',
      notes: []
    }
  }

  componentWillMount() {
    this.getNotes();
  }

  addNote = (e) => {
    e.preventDefault();
    const url = `/notes/${this.state.username}`;

    axios.post(url, {
      text: this.state.value
    })
      .then(() => this.getNotes())
      .catch(err => console.log(err))

    this.setState({value: ''});
  }

  onChange = (e) => {
    this.setState({value: e.target.value})
  }

  removeNote = (event, index) => {
    event.preventDefault();
    const url = `/notes/${this.state.username}/${index}`;

    axios.delete(url)
      .then(() => this.getNotes())
      .catch(err => console.log(err))
  }

  getNotes = () => {
    const url = `/notes/${this.state.username}`;

    axios.get(url)
      .then(({data}) => {
        this.setState({
          notes: data.notes
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addNote}>
          <input value={this.state.value} onChange={this.onChange}/>
          <button>Add Note</button>
        </form>
        <ul className='list-group'>
          {
            this.state.notes.map((note, i) => <li className='list-group-item' key={i}>
              {note}
              <a href="#" onClick={(e) => this.removeNote(e, i)}> X </a>
            </li> )
          }

        </ul>
      </div>
    )
  }
}
