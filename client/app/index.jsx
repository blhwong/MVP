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
      username: undefined
    };
  }

  callSpotify() {
    console.log('hello', !this.state.listData);
    if (!this.state.listData) {
      console.log('calling spotify');
      var app = this;
      var access_token = window.location.hash.split('=');
      access_token = access_token[1].split('&refresh_token');
      access_token = access_token[0];
      $.ajax({
        url: 'https://api.spotify.com/v1/me/player/recently-played',
        type: 'GET',
        contentType: 'application/json',
        headers: {
          Authorization: 'Bearer ' + access_token
        },
        data: {
          limit: 50
        },
        success: function(data) {
          console.log('success!');
          console.log(data);
          app.setState({listData: data.items});
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
  render () {
    return (
      <div>
        <a href='/login'>{window.location.hash.length > 0 && this.callSpotify()}Login</a>
        <a></a>
        <a></a>
        <a></a>
        <a></a>
        <a></a>
        <a></a>
        <input type="button"></input>
        <h2>Your most recent tracks:</h2>
        <div>
          <List list={this.state.listData}/>
        </div>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));