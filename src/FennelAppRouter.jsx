import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PageContainer from './views/components/PageContainer';
import Navigation from './views/pages/Navigation';
import Home from './views/pages/Home';
import Profile from './views/pages/Profile';
import Inbox from './views/pages/Inbox';
import Diagnostics from './views/pages/Diagnostics';
import GenerateKeypair from './views/pages/GenerateKeypair';
import PublishKey from './views/pages/PublishKey';
import RevokeKey from './views/pages/RevokeKey';
import Feed from './views/pages/Feed';
import Identity from './views/pages/Identity';
import BackupKey from './views/pages/BackupKey';
import NewFeedMessage from './views/pages/NewFeedMessage';
import GenerateWallet from './views/pages/GenerateWallet';
import RestoreWallet from './views/pages/RestoreWallet';
import Contacts from './views/pages/Contacts';
import NewMessage from './views/pages/NewMessage';
import Whiteflag from './views/pages/Whiteflag';
import Account from './views/pages/Account';
import ImportKeypair from './views/pages/ImportKeypair';
import IPFS from './views/pages/IPFS';
import SendToken from './views/pages/SendToken';
import ProfileFormView from './views/pages/ProfileFormView/ProfileFormView';
import Certificate from './views/pages/Certificate';
import CertificateList from './views/pages/Certificate/CertificateList';
import CertificateRevokeForm from './views/pages/Certificate/CertificateRevokeForm';
import CertificateDetailView from './views/pages/Certificate/CertificateDetailView';
import Rating from './views/pages/Rating';
import NewRatingView from './views/pages/Rating/NewRatingView';
import UpdateRatingView from './views/pages/Rating/UpdateRatingView';
import RevokeRatingView from './views/pages/Rating/RevokeRatingView';

function FennelAppRouter() {
  return (
    <>
      <Navigation />
      <PageContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/diagnostics" element={<Diagnostics />} />
          <Route
            path="/identity/generate-keypair"
            element={<GenerateKeypair />}
          />
          <Route path="/identity/profile" element={<Profile />} />
          <Route
            path="/identity/update-profile"
            element={<ProfileFormView />}
          />
          <Route path="/identity/publish-key" element={<PublishKey />} />
          <Route path="/identity/backup-key" element={<BackupKey />} />
          <Route path="/identity/revoke-key" element={<RevokeKey />} />
          <Route path="/identity/import-keypair" element={<ImportKeypair />} />
          <Route path="/identity/ipfs" element={<IPFS />} />
          <Route path="/identity" element={<Identity />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/certificate/list" element={<CertificateList />} />
          <Route
            path="/certificate/detail"
            element={<CertificateDetailView />}
          />
          <Route
            path="/certificate/revoke"
            element={<CertificateRevokeForm />}
          />
          <Route path="/rating" element={<Rating />} />
          <Route path="/rating/create" element={<NewRatingView />} />
          <Route path="/rating/update" element={<UpdateRatingView />} />
          <Route path="/rating/revoke" element={<RevokeRatingView />} />
          <Route path="/contacts/*" element={<Contacts />} />
          <Route path="/whiteflag/*" element={<Whiteflag />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed/message" element={<NewFeedMessage />} />
          <Route path="/inbox/new" element={<NewMessage />} />
          <Route path="/wallet/generate" element={<GenerateWallet />} />
          <Route path="/wallet/restore" element={<RestoreWallet />} />
          <Route path="/token/send" element={<SendToken />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </PageContainer>
    </>
  );
}

export default FennelAppRouter;
