import React from 'react';
import PropTypes from 'prop-types';

function PageContainer(props) {
  return (
    <main className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between px-4 lg:static lg:block lg:justify-start lg:max-w-[75rem]">
          {props.children}
        </div>
      </div>
    </main>
  );
}

PageContainer.propTypes = {
  children: PropTypes.array
};

export default PageContainer;
