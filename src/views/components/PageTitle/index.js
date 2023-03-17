import React from 'react';
import PropTypes from 'prop-types';

function PageTitle(props) {
  return (
    <h1 className="text-3xl font-normal leading-normal mt-0 mb-2 text-slate-800">
      {props.children}
    </h1>
  );
}

PageTitle.propTypes = {
  children: PropTypes.array
};

export default PageTitle;
