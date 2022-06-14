import React from 'react';

function PageTitle(props) {
  return (
    <h1 className="text-3xl font-normal leading-normal mt-0 mb-2 text-slate-800">
      {props.children}
    </h1>
  );
}

export default PageTitle;
