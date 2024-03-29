import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

function FeedListView(props) {
  const [state, setState] = useState({ readingId: null });

  const toggleItem = (id) => {
    setState((prevState) => ({
      ...prevState,
      readingId: id
    }));
  };

  return state.readingId == null ? (
    <div style={{ width: '90%' }}>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {props.itemList.map((item) => (
              <tr key={item.id}>
                <td>
                  <Button onClick={() => toggleItem(item.id)}>Read</Button>
                </td>
                <td>
                  {item.message.length < 50
                    ? item.message
                    : item.message.substr(0, 49) + `...`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <>
      <p className="mb-2">
        {props.itemList.find((item) => item.id === state.readingId).message}
      </p>
      <Button onClick={() => toggleItem(null)}>Close</Button>
    </>
  );
}

FeedListView.propTypes = {
  itemList: PropTypes.array
};

export default FeedListView;
