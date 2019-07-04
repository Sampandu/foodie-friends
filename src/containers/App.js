import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { requestRestaurants } from '../store/actions';
import Radar from '../util'
import Cardlist from '../components/Cardlist';
import Scroll from '../components/Scroll';
import Footer from '../components/Footer';
import { Button } from 'semantic-ui-react';


class App extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      restaurants: [],
      offset: 0,
      latitude: 0,
      longitude: 0
    }
  }

  onSearchChange = (event) => {
    this.setState({city: event.target.value});
  }

  handleSearch = async () => {
    await this.setState({offset: 0});
    this.props.requestRestaurants(this.state.city, 0);
  }

  handleSearchNearMe = () => {
    const self = this
    Radar.trackOnce(function(status, location, user, events) {
      if(status === 'SUCCESS') {
        console.log('latitude + longitude', location)
        self.setState({
          latitude: location.latitude,
          longitude: location.longitude
        })
        self.props.requestRestaurants('', 0, location.latitude, location.longitude);
      }
    })
  }


  handleNextPage = async () => {
    const newOffset = this.state.offset + 20;
    await this.setState({offset: newOffset});
    if (this.state.city) {
      await this.props.requestRestaurants(this.state.city, this.state.offset);
    } else {
      await this.props.requestRestaurants('', this.state.offset, this.state.latitude, this.state.longitude);
    }
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
          <Button content='Near Me' onClick={this.handleSearchNearMe} color='blue' />
          <div className="ui action input">
            <input type="text" placeholder="Search..." onChange={this.onSearchChange} />
            <button className="ui button gray" onClick={this.handleSearch}>Search</button>
          </div>
          <Button content='Next' icon='right arrow' labelPosition='right' onClick={this.handleNextPage}/>

          <Button.Group floated='right'>
            <Button onClick={this.handleSortByRating} color='yellow'>SortByRating</Button>
            <Button onClick={this.handleSortByPrice} color='yellow'>SortByPrice</Button>
          </Button.Group>
        </div>

        <Scroll>
          <Cardlist restaurants={restaurants}/>
        </Scroll>
        <Footer />
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
    requestRestaurants: (city, offset, latitude, longitude) => dispatch(requestRestaurants(city, offset, latitude, longitude))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
