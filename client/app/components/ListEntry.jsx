import React from 'react';

var ListEntry = (props) => {
  return (
    <div>
      {props.entry.track.artists[0].name} - {props.entry.track.name}
    </div>
    );

};

export default ListEntry;