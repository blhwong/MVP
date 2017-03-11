import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

class App extends React.Component {


  onClick() {
    console.log(window);
    window.location = '/login';
  }

  render () {
    return <div onClick={this.onClick}> Get Started Here! </div>;
  }
}

render(<App/>, document.getElementById('app'));