import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

class App extends React.Component {

  callSpotify() {
    var access_token = window.location.hash.split('=');
    access_token = access_token[1].split('&refresh_token');
    access_token = access_token[0];
    // console.log('Calling Spotify');
    // console.log(access_token);
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
      },
      error: function() {
        console.log('fail');
      }
    });
  }
  render () {
    return <a href='/login'>{window.location.hash.length > 0 && this.callSpotify()}Login</a>;
  }
}

render(<App/>, document.getElementById('app'));