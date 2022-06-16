import React from 'react';
import {Link, Routes, Route} from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import {WhiteflagEncode} from './Encode';

function Whiteflag() {
  return (
    <PageContainer>
      <div className="flex flex-row">
        <div className="basis-1/4">
          <ul className="menu bg-base-300 w-56 p-2 rounded-box">
            <li>
              <Link to={'encode'}>Encode Demo</Link>
            </li>
            <li>
              <Link to={'decode'}>Decode Demo</Link>
            </li>
          </ul>
        </div>
        <div className="basis-3/4 px-8">
          <PageTitle>Whiteflag</PageTitle>
          <Text>Play around with the whiteflag protocol</Text>
          <Routes>
            <Route path="encode" element={<WhiteflagEncode />} />
            <Route path="decode" element={'Decode'} />
          </Routes>
        </div>
      </div>
    </PageContainer>
  );
}

export default Whiteflag;
