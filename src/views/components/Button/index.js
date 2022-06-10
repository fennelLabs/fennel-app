import React from 'react';

function Button({children, ...attributes}) {
  return (
    <button className="btn" type="button" {...attributes}>
      {children}
    </button>
  );
}

export default Button;
