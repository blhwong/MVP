import React from 'react';

var ListEntry = (props) => {
  if (props.option.slice(9, 10) === 'A') {
    return (
      <div>
        <div>
          {props.entry.name}
        </div>
        <div>
          <img src={props.entry.images[2].url}></img>
        </div>
      </div>
    );
  } else if (props.option.slice(9,10) === 'T') {
    return (
      <div>
        <div>
          <img src={props.entry.album.images[2].url}></img>
        </div>
        <div>
          {props.entry.artists[0].name} - {props.entry.name}
        </div>
      </div>
    );
  } else {
    return (
      <div>{props.entry.track.artists[0].name} - {props.entry.track.name}</div>
    );
  }
};

export default ListEntry;