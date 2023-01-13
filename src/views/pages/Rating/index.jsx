import React from 'react';
import PageTitle from '../../components/PageTitle';
import RatingSubNav from './RatingSubNav';

function Rating() {
  console.log('The right page is loading.');
  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <RatingSubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Rating Signal Activity</PageTitle>
      </div>
    </div>
  );
}

export default Rating;
