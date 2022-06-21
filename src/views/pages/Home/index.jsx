import React from 'react';
import PageTitle from '../../components/PageTitle';

function Home() {
  return (
    <div className="flex flex-row max-w-[50rem]">
      <div className="basis-4/4 px-8">
        <PageTitle>Home</PageTitle>
        <div className="text">
          The Fennel Protocol is a decentralized software distribution that
          includes or will include decentralized messaging servers, access to
          decentralized storage features, and a blockchain network used as a
          repository for inter-organizational messaging. A number of the
          features listed in this section are on-chain/off-chain hybrid features
          and will as a result incur fees on the Fennel network at certain
          critical points.
        </div>
      </div>
    </div>
  );
}

export default Home;
