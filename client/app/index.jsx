import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
// import ListEntry from './ListEntry.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

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
    return
      <div>
        <a href='/login'>{window.location.hash.length > 0 && this.callSpotify()}Login</a>
      </div>;
  }
}

render(<App/>, document.getElementById('app'));