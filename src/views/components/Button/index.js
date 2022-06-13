import React from 'react';

function Button({children, ...attributes}) {
  return (
    <button className="btn" {...attributes}>
      {children}
    </button>
  );
}

export default Button;
