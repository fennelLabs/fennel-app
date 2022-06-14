import React from 'react';

function ListView(props) {
  return (
    <div style={{ width: '90%' }}>
      {props.itemList.map((item) => (
        <div key={item.id}>
          <div>
            <strong>{item.fingerprint}</strong>
          </div>
          <div>
            {item.message}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListView;
