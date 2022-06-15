import React from 'react';
import {Route, Routes, Outlet} from 'react-router-dom';
import './App.css';
import Navigation from './views/pages/Navigation';
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
import Contacts from './views/pages/Contacts';
import NewMessage from './views/pages/NewMessage';
import Home from './views/pages/Home';
import PageContainer from './views/components/PageContainer';

function FennelAppRouter() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/diagnostics" element={<Diagnostics />} />
        <Route
          path="/identity/import-generate-keypair"
          element={<GenerateKeypair />}
        />
        <Route path="/identity/profile" element={<Profile />} />
        <Route path="/identity/publish-key" element={<PublishKey />} />
        <Route path="/identity/backup-key" element={<BackupKey />} />
        <Route path="/identity/revoke-key" element={<RevokeKey />} />
        <Route path="/identity" element={<Identity />} />
        <Route path="/contacts/*" element={<Contacts />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/message" element={<NewFeedMessage />} />
        <Route path="/inbox/new" element={<NewMessage />} />
        <Route path="/wallet/generate" element={<GenerateWallet />} />
        <Route path="/wallet/restore" element={<RestoreWallet />} />
      </Routes>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  );
}

export default FennelAppRouter;
