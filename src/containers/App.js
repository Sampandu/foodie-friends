import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { requestRestaurants } from '../store/actions';
import Cardlist from '../components/Cardlist';
import Scroll from '../components/Scroll';

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
    const newOffset = this.state.offset + 20;
    await this.setState({offset: newOffset});
    await this.props.requestRestaurants(this.state.city, this.state.offset);
  }

  handleSortByRating = () => {
    let restaurants = this.state.restaurants;
    restaurants.forEach(e => {
      if(!e.rating) e.rating = 0;
    })
    restaurants.sort((a,b) => b.rating - a.rating);
    this.setState({restaurants});
  }

  handleSortByPrice = () => {
    let restaurants = this.state.restaurants;
    restaurants.forEach(e => {
      if(!e.price) e.price = ''
    });
    restaurants.sort((a, b) => b.price.length - a.price.length);
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
        <h1 className='f1 pt2 pb1 mb0'>Foodie  Friends</h1>

        <div className='pt1 pb2 ml6 nav'>
          <input
            className='f4 pa2 ba br3 b--light-gray bg-washed-blue mr1'
            type='search'
            placeholder='Please enter city'
            onChange={this.onSearchChange}
          />
          <button
            className='f5 no-underline black bg-lightest-blue hover-bg-light-blue hover-white inline-flex items-center ph1 pv2 ba border-box br3 ma1'
            type='click'
            onClick={this.handleSearch}>
            <span className='pr1'>Search</span>
          </button>

          <button
            className='f5 no-underline black bg-lightest-blue hover-bg-light-blue hover-white inline-flex items-center ph1 pv2 ba border-box br3 ma1'
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

          <div className='mt2'>
            <button
              className='f5 no-underline black bg-light-yellow hover-bg-light-blue hover-white inline-flex items-center ph1 pv2 ba border-box br3 ma1'
              type='click'
              onClick={this.handleSortByRating}
            >
              <span className='pr1'>SortByRating</span>
            </button>

            <button
              className='f5 no-underline black bg-light-yellow hover-bg-light-blue hover-white inline-flex items-center ph1 pv2 ba border-box br3 ma1'
              type='click'
              onClick={this.handleSortByPrice}
            >
              <span className='pr1'>SortByPrice</span>
            </button>
          </div>
        </div>

        <Scroll>
          <Cardlist restaurants={restaurants}/>
        </Scroll>


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
