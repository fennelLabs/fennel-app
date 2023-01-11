import React, {useEffect, useState} from 'react';
import PageTitle from '../../components/PageTitle';
import {useServiceContext} from '../../../contexts/ServiceContext';
import CertificateSubNav from './CertificateSubNav';
import CertificateListView from './CertificateListView';

function Certificates() {
  const {node} = useServiceContext();
  const [certificateList, setCertificateList] = useState([]);
  const [nodeApiReady, setNodeApiReady] = useState(true);

  useEffect(() => {
    const sub = node.certificates$.subscribe((d) => {
      setCertificateList(d);
    });

    if (node.apiNotReady()) {
      setNodeApiReady(false);
    } else {
      node.checkCertificateList();
      setNodeApiReady(true);
    }

    return () => {
      sub.remove();
    };
  }, [node]);

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <CertificateSubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Certificates</PageTitle>
        {!nodeApiReady && (
          <div className="error" role="alert">
            The Fennel Node is currently unavailable. Please try again later.
          </div>
        )}
        {Object.keys(certificateList).length > 0 && (
          <CertificateListView itemList={certificateList} />
        )}
      </div>
    </div>
  );
}

export default Certificates;
