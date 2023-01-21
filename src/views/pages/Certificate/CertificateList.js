import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { useServiceContext } from '../../../contexts/ServiceContext';
import CertificateSubNav from './CertificateSubNav';
import CertificateListView from './CertificateListView';

function Certificates() {
  const { node } = useServiceContext();
  const [certificateList, setCertificateList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [nodeApiReady, setNodeApiReady] = useState(true);

  useEffect(() => {
    const sub = node.certificates$.subscribe((d) => {
      setCertificateList(d);
      setFilteredList(d);
    });

    if (node.apiNotReady()) {
      setNodeApiReady(false);
    } else {
      node.checkCertificateList();
      setNodeApiReady(true);
    }

    if (searchText != '') {
      setFilteredList(
        certificateList.filter((item) => {
          return item.origin.toLowerCase().includes(searchText.toLowerCase());
        })
      );
    } else {
      setFilteredList(certificateList);
    }

    return () => {
      sub.remove();
    };
  }, [node, searchText, certificateList]);

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <CertificateSubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Certificates</PageTitle>
        <div>
          <input
            name="search"
            value={searchText}
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        {!nodeApiReady && (
          <div className="error" role="alert">
            The Fennel Node is currently unavailable. Please try again later.
          </div>
        )}
        {Object.keys(filteredList).length > 0 && (
          <CertificateListView itemList={filteredList} />
        )}
      </div>
    </div>
  );
}

export default Certificates;
