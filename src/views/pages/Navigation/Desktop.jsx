import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';

export function Desktop() {
  return (
    <>
      {React.Children.toArray(
        routes.map((r, index) => (
          <Link key={index} to={r.to}>
            {r.text}
          </Link>
        ))
      )}
    </>
  );
}
