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
    debugger;
    console.log('hello', !this.state.listData);

    if (!this.state.listData || this.state.option !== option) {
      console.log('calling spotify');
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
          console.log('success!');
          console.log(data);
          app.setState({listData: data.items});
          if (!app.state.access_token) {
            console.log('state', app.state)
            app.setState({access_token: access_token});
          }
          app.setState({option: option});
          if (window.location.hash.length > 0) {
            window.location.hash = '';
          }
          // do i have username?
            // no call endpoint to receive current user profile and create profile in db
          // call another endpoint to insert info to db from either username in state
        },
        error: function() {
          console.log('fail');
        }
      });
    }
  }
  onClick(event) {
    console.log('click', event, this.state.access_token);
    this.callSpotify(event.target.innerHTML + ':');
  }
  render () {
    return (
      <div>
        <div>
          <a href='/login'>{window.location.hash.length > 0 && this.callSpotify()}Login</a>
        </div>
        <div>
          {/*<a href='/' onClick={this.state.access_token && this.callSpotify('Your most recently played:')}>Your most recently played:</a>*/}
          <a onClick={this.onClick.bind(this)}>Your most recently played</a>
        </div>
        <div>
        <a onClick={this.onClick.bind(this)}>Your Top Artists (Over several years)</a>
        </div>
        {/*<div>
          <a href='/'>{this.state.access_token && this.callSpotify('Your Top Tracks (Over several years):')}Your Top Tracks (Over several years):</a>
        </div>
        <div>
          <a href='/'>{this.state.access_token && this.callSpotify('Your Top Artists (Over last 6 months):')}Your Top Artists (Over last 6 months):</a>
        </div>
        <div>
          <a href='/'>{this.state.access_token && this.callSpotify('Your Top Tracks (Over last 6 months):')}Your Top Tracks (Over last 6 months):</a>
        </div>
        <div>
          <a href='/'>{this.state.access_token && this.callSpotify('Your Top Artists (Over last 4 weeks):')}Your Top Artists (Over last 4 weeks):</a>
        </div>
        <div>
          <a href='/'>{this.state.access_token && this.callSpotify('Your Top Tracks (Over last 4 weeks):')}Your Top Tracks (Over last 4 weeks):</a>
        </div>*/}
        <h2>{this.state.option}</h2>
        <div>
          <List list={this.state.listData}/>
        </div>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));