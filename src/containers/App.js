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
    console.log(event.target.value);
    // this.setState({city: event.target.value});
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
        </div>
      </div>
    )
  }
}

export default App;
