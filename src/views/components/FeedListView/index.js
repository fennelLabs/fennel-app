import React from 'react';
import PropTypes from 'prop-types';

function FeedListView(props) {
  return (
    <div style={{width: '90%'}}>
      {props.itemList.map((item) => (
        <div key={item.id}>
          <div>{item.message}</div>
          <hr />
        </div>
      ))}
    </div>
  );
}

FeedListView.propTypes = {
  itemList: PropTypes.array
};

export default FeedListView;
