import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { requestRestaurants } from '../store/actions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      restaurants: [],
      offset: 0
    }
  }

  onSearchChange = (event) => {
    this.setState({city: event.target.value});
  }

  handleSearch = async () => {
    await this.setState({offset: 0});
    this.props.requestRestaurants(this.state.city, 0);
  }

  handleNextPage = async () => {
    // console.log('>>>>>>>>');
    const newOffset = this.state.offset + 20;
    await this.setState({offset: newOffset});
    await this.props.requestRestaurants(this.state.city, this.state.offset);
  }

  handleSortByRating = () => {
    let restaurants = this.state.restaurants;
    // console.log('++++++', restaurants);
    restaurants.sort((a,b) => b.rating - a.rating);
    // console.log('-------', restaurants);
    this.setState({restaurants});
  }

  handleSortByPrice = () => {
    let restaurants = this.state.restaurants;
    // console.log('++++++', restaurants);
    restaurants.forEach(e => {
      if(!e.price) e.price = ''
    });
    restaurants.sort((a, b) => b.price.length - a.price.length);
    // console.log('-------', restaurants);
    this.setState({restaurants});
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
            className='f5 no-underline black bg-lightest-blue hover-bg-light-blue hover-white inline-flex items-center pa3 ba border-box br3 ma3'
            type='click'
            onClick={this.handleSearch}>
            <span className='pr1'>Search</span>
          </button>

          <button
            className='f5 no-underline black bg-lightest-blue hover-bg-light-blue hover-white inline-flex items-center pa3 ba border-box br3 ma3'
            type='click'
            onClick={this.handleNextPage}
            >
            <span className='pr1'>Next</span>
            <svg
              className="w1"
              data-icon="chevronRight"
              viewBox="0 0 32 32"
              style={{fill:'currentcolor'}}>
              <title>chevronRight icon</title>
              <path d="M12 1 L26 16 L12 31 L8 27 L18 16 L8 5 z"></path>
            </svg>
          </button>

          <button
            className='f5 no-underline black bg-lightest-blue hover-bg-light-blue hover-white inline-flex items-center pa3 ba border-box br3 ma3'
            type='click'
            onClick={this.handleSortByRating}>
            <span className='pr1'>Sort By Rating</span>
          </button>

          <button
            className='f5 no-underline black bg-lightest-blue hover-bg-light-blue hover-white inline-flex items-center pa3 ba border-box br3 ma3'
            type='click'
            onClick={this.handleSortByPrice}>
            <span className='pr1'>Sort By Price</span>
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
                        <p>{restaurant.rating}</p>
                        <p>{restaurant.price}</p>
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
    requestRestaurants: (city, offset) => dispatch(requestRestaurants(city, offset))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
