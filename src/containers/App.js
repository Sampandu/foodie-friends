import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      restaurants: []
    }
  }

  onSearchChange = (event) => {
    this.setState({city: event.target.value});
  }

  handleSearch = () => {
    console.log('++');
  }

  render() {
    return (
      <div>
        <h1>Foodie Friends</h1>

        <div>
          <input
            placehold='Please enter city'
            onChange={this.onSearchChange}
          />
          <button
            type='click'
            onClick={this.handleSearch}>Search
          </button>
        </div>
      </div>
    )
  }
}

export default App;
