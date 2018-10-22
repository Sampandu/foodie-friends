import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { requestRestaurants } from '../store/actions';

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

  handleSearch = async () => {
    await this.props.requestRestaurants();
    // await this.setState({restaurants: this.props.restaurants});
    console.log('+++++', this.state.restaurants);
  }

  componentDidUpdate (prepProps) {
    if (prepProps.restaurants !== this.props.restaurants) {
      this.setState({restaurants: this.props.restaurants});
    }
  }

  render() {
    const { restaurants } = this.state;

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

        <div>
            {
              restaurants.map((restaurant,i) => {
                return (
                  <div key={i}>
                    <p>{restaurant.name}</p>
                  </div>
                )
              })
            }
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    restaurants : state.restaurants
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestRestaurants: () => dispatch(requestRestaurants())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
