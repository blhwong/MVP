import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

class App extends React.Component {

  render () {
    return <a href='/login'> Get Started Here! </a>;
  }
}

render(<App/>, document.getElementById('app'));