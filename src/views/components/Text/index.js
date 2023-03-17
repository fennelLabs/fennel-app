import React from 'react';
import PropTypes from 'prop-types';

function Text(props) {
  return (
    <p className="text-base font-heavy leading-relaxed mt-0 mb-4 text-slate-800">
      {props.children}
    </p>
  );
}

Text.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};

export default Text;
