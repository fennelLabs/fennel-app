import React from 'react';

function ListView(props) {
  return (
    <div style={{width: '90%'}}>
      {props.itemList.map((item) => (
        <div key={item.id}>{item.message}</div>
      ))}
    </div>
  );
}

export default ListView;
