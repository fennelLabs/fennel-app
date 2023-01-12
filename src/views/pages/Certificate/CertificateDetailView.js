import React from 'react';
import PageTitle from '../../components/PageTitle';
import CertificateSubNav from './CertificateSubNav';
import Button from '../../components/Button';
import {useLocation, useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';

function CertificateDetailView() {
  let navigate = useNavigate();
  let location = useLocation();
  console.log('location', location);
  console.log('location.state', location.state);
  let {origin, target} = location.state;
  console.log(`${origin}, ${target}`);
  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <CertificateSubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Certificate</PageTitle>
        <div>
          <div>
            <div>Origin</div>
            <div>{origin}</div>
          </div>
          <div>
            <div>Target</div>
            <div>{target}</div>
          </div>
        </div>
        <Button
          onClick={() => {
            navigate('/certificate/list');
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
}

CertificateDetailView.propTypes = {
  origin: PropTypes.string,
  target: PropTypes.string
};

export default CertificateDetailView;
