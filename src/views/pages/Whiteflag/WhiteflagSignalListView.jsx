import React, { useState } from 'react';
import { Button } from '../../components/Button';

function WhiteflagSignalListView(props) {
  const [readingId, setReadingId] = useState(null);

  const toggleItem = (id) => {
    if (id === readingId) {
      setReadingId(null);
    } else {
      setReadingId(id);
    }
  };

  return readingId == null ? (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Origin</th>
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
                  {item.origin.length < 10
                    ? item.origin
                    : item.origin.substr(0, 10) + `...`}
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
    <div>
      <p className="mb-2">
        {props.itemList.find((item) => item.id === readingId).content}
      </p>
      <Button onClick={() => toggleItem(null)}>Close</Button>
    </div>
  );
}

WhiteflagSignalListView.propTypes = {
  itemList: PropTypes.array
};

export default WhiteflagSignalListView;
