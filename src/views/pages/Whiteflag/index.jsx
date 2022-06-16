import React from 'react';
import {Link, Routes, Route} from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Text from '../../components/Text';
import {WhiteflagEncode} from './Encode';

function Whiteflag() {
  return (
    <PageContainer>
      <div className="grid w-full h-full">
        <PageTitle>Whiteflag</PageTitle>
        <Text>Play around with the whiteflag protocol</Text>
        <WhiteflagEncode />
      </div>
    </PageContainer>
  );
}

export default Whiteflag;
