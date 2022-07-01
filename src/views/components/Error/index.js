import React from 'react';

function Error(props) {
  return (
    <p className="text-base font-heavy leading-relaxed mt-0 mb-4 text-rose-500">
      {props.children}
    </p>
  );
}

export default Error;
