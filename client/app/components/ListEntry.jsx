import React from 'react';

var ListEntry = (props) => {
  console.log('option', props.option);
  debugger;
  if (props.option === 'Your Top Artists (Over several years):') {
    return (
      <div>{props.entry.name}
        <img src={props.entry.images[2].url}></img>
      </div>
    );
  } else if (props.option === 'Your Top Tracks (Over several years):') {
    return (
      <div></div>
    );
  } else if (props.option === 'Your Top Artists (Over last 6 months):') {
    return (
      <div>Artists</div>
    );
  } else if (props.option === 'Your Top Tracks (Over last 6 months):') {
    return (
      <div></div>
    );
  } else if (props.option === 'Your Top Artists (Over last 4 weeks):') {
    return (
      <div>Artists</div>
    );
  } else if (props.option === 'Your Top Tracks (Over last 4 weeks):') {
    return (
      <div></div>
    );
  } else {
    return (
      <div>{props.entry.track.artists[0].name} - {props.entry.track.name}</div>
    );
  }
  // return (
  //   <div>
  //     {
  //       if (props.entry.track) {
  //         console.log('test');
  //       }


  //       props.entry.track ? props.entry.track.artists[0].name : props.entry.artists.name} - {props.entry.track ? props.entry.track.name : props.entry.name}
  //   </div>
  //   );

};

export default ListEntry;