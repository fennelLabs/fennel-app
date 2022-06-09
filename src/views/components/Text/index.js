import React from 'react';

function Text(props) {
  return (
    <p className="text-base font-heavy leading-relaxed mt-0 mb-4 text-slate-800">
      {props.children}
    </p>
  );
}

export default Text;
