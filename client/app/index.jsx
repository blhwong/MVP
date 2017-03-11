import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

class App extends React.Component {

  componentDidMount() {
    // $.ajax({
    //   url: '/home',
    //   type: 'GET',
    //   contentType: 'application/json',
    //   success: function(data) {
    //     console.log(data);
    //   },
    //   error: function() {
    //     console.log('fail');
    //   }
    // });
  }
  render () {
    return <a href='/login'> Get Started Here! </a>;
  }
}

render(<App/>, document.getElementById('app'));