import React from 'react';
import PropTypes from 'prop-types';

function ProfileListView(props) {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(props.traits).map(([key, value], index) => (
              <tr key={index}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

ProfileListView.propTypes = {
  traits: PropTypes.array
};

export default ProfileListView;
