import React from 'react';
import PropTypes from 'prop-types';

function ListView(props) {
  return (
    <div style={{width: '90%'}}>
      {props.itemList.map((item) => (
        <div key={item.id}>
          <div>
            <strong>{item.fingerprint}</strong>
          </div>
          <div>{item.message}</div>
        </div>
      ))}
    </div>
  );
}

ListView.propTypes = {
  itemList: PropTypes.array
};

export default ListView;
