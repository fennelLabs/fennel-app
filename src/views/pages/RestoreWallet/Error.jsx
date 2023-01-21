import React from 'react';
import PropTypes from 'prop-types';

export function Error({ children }) {
  return (
    children && (
      <div
        className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3"
        role="alert"
      >
        {children}
      </div>
    )
  );
}

Error.propTypes = {
  children: PropTypes.array
};
