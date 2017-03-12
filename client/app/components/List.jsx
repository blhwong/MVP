import React from 'react';
import ListEntry from './ListEntry.jsx';

var List = (props) => {
  return (
    <div>

      {props.list && props.list.map(listEntry => <ListEntry entry={listEntry}/>)}
    </div>
    );
};

export default List;