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
      <p>This page checks to see if there iss evidence of an account.</p>
      <p>
        If no account then a bunch of introductory text explaining that acts as
        a sort of splash followed by the option to getting started with creating
        an account.
      </p>
      <p>
        If there is an account, then we need to redirect to whatever page we
        determine is approrpriate. It might be something like a dashboard of
        some sort or maybe we just push to identities page and see if they have
        an identity
      </p>
      <Link to="/account">
        <Button type="button" className="mt-2">
          Get Started
        </Button>
      </Link>
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
