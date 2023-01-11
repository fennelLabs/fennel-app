import React, {useState} from 'react';
import PropTypes from 'prop-types';

function CertificateListView(props) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Origin</th>
              <th>Target</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(props.itemList).map(([_, value], index) => (
              <tr key={index}>
                <td>{value.origin}</td>
                <td>{value.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

CertificateListView.propTypes = {
  itemList: PropTypes.array
};

export default CertificateListView;
