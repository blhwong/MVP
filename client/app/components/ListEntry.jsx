import React from 'react';

var ListEntry = (props) => {
  if (props.entry.track) {
    return (
      <div>test2</div>
    );
  } else {
    return (
      <div>test1</div>
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