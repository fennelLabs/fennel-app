import React from 'react';
import LogoSvg from './logo.svg';

function Logo(props) {
  return <img src={LogoSvg} {...props} />;
}

export default Logo;
