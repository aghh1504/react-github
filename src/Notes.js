import React, {Component} from 'react'

export default class Notes extends Component{
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      items: []
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({value:'', items: [...this.state.items, this.state.value]})
  }

  onChange = (e) => {
    this.setState({value: e.target.value})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input value={this.state.value} onChange={this.onChange}/>
          <button>Add Note</button>
        </form>
        <ul className='list-group'>
          {
            this.state.items.map((item, i) => <li className='list-group-item' key={i}>{item}</li> )
          }
        </ul>
      </div>
    )
  }
}
