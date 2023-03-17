import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, ...attributes }) {
  return (
    <button className="btn" {...attributes}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string
};

export default Button;
