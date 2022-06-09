import React from 'react';
import './Navigation.styles.css';
import Logo from '../../components/Logo';
import {useMediaQuery} from '../../../utils/useMediaQuery';
import {Desktop} from './Desktop';
import {Mobile} from './Mobile';
import TailwindyNav from './TailwindyNav';

const mediaQuery = 'screen and (min-width: 768px)';

function Navigation() {
  const isDesktop = useMediaQuery(mediaQuery);

  return <TailwindyNav />;
  return (
    <nav
      style={{
        borderBottom: 'solid 1px',
        paddingBottom: '1rem'
      }}
    >
      <Logo style={{width: '4rem'}} />
      {isDesktop ? <Desktop /> : <Mobile />}
    </nav>
  );
}

export default Navigation;
