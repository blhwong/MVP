import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
// import ListEntry from './ListEntry.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: undefined,
      option: '',
      username: undefined,
      access_token: undefined
    };
  }

  callSpotify(option = 'Your most recently played:') {
    if (!this.state.listData || this.state.option !== option) {
      var app = this;
      var access_token;
      if (!this.state.access_token) {
        access_token = window.location.hash.split('=');
        access_token = access_token[1].split('&refresh_token');
        access_token = access_token[0];
      } else {
        access_token = this.state.access_token;
      }
      var url;
      var data = {
        limit: 50
      };
      if (option === 'Your Top Artists (Over several years):') {
        url = 'https://api.spotify.com/v1/me/top/artists';
        data.time_range = 'long_term';
      } else if (option === 'Your Top Tracks (Over several years):') {
        url = 'https://api.spotify.com/v1/me/top/tracks';
        data.time_range = 'long_term';
      } else if (option === 'Your Top Artists (Over last 6 months):') {
        url = 'https://api.spotify.com/v1/me/top/artists';
        data.time_range = 'medium_term';
      } else if (option === 'Your Top Tracks (Over last 6 months):') {
        url = 'https://api.spotify.com/v1/me/top/tracks';
        data.time_range = 'medium_term';
      } else if (option === 'Your Top Artists (Over last 4 weeks):') {
        url = 'https://api.spotify.com/v1/me/top/artists';
        data.time_range = 'short_term';
      } else if (option === 'Your Top Tracks (Over last 4 weeks):') {
        url = 'https://api.spotify.com/v1/me/top/tracks';
        data.time_range = 'short_term';
      } else {
        url = 'https://api.spotify.com/v1/me/player/recently-played';
      }

      $.ajax({
        url: url,
        type: 'GET',
        contentType: 'application/json',
        headers: {
          Authorization: 'Bearer ' + access_token
        },
        data: data,
        success: function(data) {
          console.log('Success!');
          app.setState({
            listData: data.items,
            access_token: access_token,
            option: option
          });
          if (window.location.hash.length > 0) {
            window.location.hash = '';
          }
          // do i have username?
            // no call endpoint to receive current user profile and create profile in db
          // call another endpoint to insert info to db from either username in state
        },
        error: function() {
          console.log('Error...');
        }
      });
    }
  }
  onClick(event) {
    this.callSpotify(event.target.innerHTML + ':');
  }
  render () {
    return (
      <div>
        <div>
          <a href='/login'>{window.location.hash.length > 0 && this.callSpotify()}Login</a>
        </div>
        <div>
          <a onClick={this.onClick.bind(this)}>Your most recently played</a>
        </div>
        <div>
          <a onClick={this.onClick.bind(this)}>Your Top Artists (Over several years)</a>
        </div>
        <div>
          <a onClick={this.onClick.bind(this)}>Your Top Tracks (Over several years)</a>
        </div>
        <div>
          <a onClick={this.onClick.bind(this)}>Your Top Artists (Over last 6 months)</a>
        </div>
        <div>
          <a onClick={this.onClick.bind(this)}>Your Top Tracks (Over last 6 months)</a>
        </div>
        <div>
          <a onClick={this.onClick.bind(this)}>Your Top Artists (Over last 4 weeks)</a>
        </div>
        <div>
          <a onClick={this.onClick.bind(this)}>Your Top Tracks (Over last 4 weeks)</a>
        </div>
        <h2>{this.state.option}</h2>
        <div>
          <List list={this.state.listData} option={this.state.option}/>
        </div>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));