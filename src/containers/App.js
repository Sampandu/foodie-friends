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

  handleSearch = () => {
    this.props.requestRestaurants(this.state.city);
  }

  handleNextPage = () => {
    console.log('>>>>>>>>');
  }

  componentDidUpdate (prepProps) {
    if (prepProps.restaurants !== this.props.restaurants) {
      this.setState({restaurants: this.props.restaurants});
    }
  }

  render() {
    const { restaurants } = this.state;

    return (
      <div className='tc'>
        <h1 className='f1'>Foodie Friends</h1>

        <div className='pa2'>
          <input
            className='f4 pa3 ba br3 b--light-gray bg-washed-blue'
            type='search'
            placeholder='Please enter city'
            onChange={this.onSearchChange}
          />
          <button
            className='f4 link dim br3 ph3 pv2 mb2 dib white bg-navy ma3'
            type='click'
            onClick={this.handleSearch}>Search
          </button>

          <button
            type='click'
            onClick={this.handleNextPage}
            >Next
          </button>
        </div>

        <div>
            {
              restaurants.map((restaurant,i) => {
                return (
                  <div
                    key={i}
                    className='bg-white dib br3 pa3 ma2 grow bw2 shadow-5'>
                    <a href={restaurant.url} target='_blank' rel="noopener noreferrer">
                      <img
                        alt='restaurant'
                        src={restaurant.image_url} width='300px' height='300px'
                      />
                      <div>
                        <h4>{restaurant.name}</h4>
                      </div>
                    </a>
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
    requestRestaurants: (city) => dispatch(requestRestaurants(city))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
