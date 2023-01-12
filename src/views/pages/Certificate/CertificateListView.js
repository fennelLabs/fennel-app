import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

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
                <td>
                  <Link
                    to="/certificate/detail"
                    state={{origin: value.origin, target: value.target}}
                  >
                    {value.origin}
                  </Link>
                </td>
                <td>
                  <Link
                    to="/certificate/detail"
                    state={{origin: value.origin, target: value.target}}
                  >
                    {value.target}
                  </Link>
                </td>
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
