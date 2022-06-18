import React, {useState, useEffect} from 'react';
import useModal from '../../../utils/useModal';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import Redirect from 'react-router-dom';
import {Link} from 'react-router-dom';

function Home() {
  const [state, setState] = useState({hasFennelAccount: false});

  useEffect(() => {
    //call to service to determine if they have a fennel account
    //then set state
    setState({hasFennelAccount: false});
  }, []);

  const controls = useModal('Menu');
  const okdialog = useModal('OkDialog');

  return !state.hasFennelAccount ? (
    <>
      <p>
        A bunch of introductory text explaining that acts as a sort of splash
        followed by the option to getting started with creating an account.
      </p>
      <Link to="/account">Get Started</Link>
    </>
  ) : (
    <Redirect
      to={{
        pathname: '/inbox' //redirect to maybe inbox or something else if they have account?
      }}
    />
  );
}

export default Home;
