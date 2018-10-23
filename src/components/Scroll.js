import React from 'react';

const Scroll = (props) => {
  return (
    <div style={{
          overflowY: 'scroll',
          'borderTop': '2px solid gray',
          'borderBottom': '2px solid gray',
          margin: 'auto',
          width: '90%',
          height: '580px'}}>
      {props.children}
    </div>
  )
}

export default Scroll;
