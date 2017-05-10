import React, { Component }  from 'react'


class Search extends Component {
  constructor({onSearch = () => {}}) {
    super();
    this.onSearch = onSearch;
    this.state = {
      value: ''
    }
  }

  onChange = (e) => {
    this.setState({value: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault()
    if(this.state.value.length) {
      this.onSearch(this.state.value);
      this.setState({value: ''});
    }
  }

  render() {
    return (
        <form onSubmit={this.onSubmit}>
        <input value={this.state.value} onChange={this.onChange}/>
        <button>Search</button>
        </form>
    );
  }
}

export default Search;
