import React from 'react';
import {Link} from 'react-router-dom';
import routes from '../../../config/routes';

export function Desktop() {
  return (
    <>
      {React.Children.toArray(
        routes.map((r) => <Link to={r.to}>{r.text}</Link>)
      )}
    </>
  );
}
