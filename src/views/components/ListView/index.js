import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

function ListView(props) {
  const [state, setState] = useState({ readingId: null });

  const toggleItem = (id) => {
    setState((prevState) => ({
      ...prevState,
      readingId: id
    }));
  };

  return state.readingId == null ? (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Fingerprint</th>
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
                  {item.fingerprint.length < 10
                    ? item.fingerprint
                    : item.fingerprint.substr(0, 10) + `...`}
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

ListView.propTypes = {
  itemList: PropTypes.array
};

export default ListView;
