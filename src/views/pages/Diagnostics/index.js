import React, {useState, useEffect} from 'react';
import {useServiceContext} from '../../../contexts/ServiceContext';

function Diagnostics() {
  const {node} = useServiceContext();
  const [data, setData] = useState(undefined);

  useEffect(() => {
    setData({pending: true, diagnostics: {}});
    const fetchData = async () => {
      const data = await node.getDiagnosticsData();
      return data;
    };
    fetchData()
      .then((fetchedData) => {
        setData({
          pending: false,
          diagnostics: fetchedData
        });
      })
      .catch(console.error);

    const fetchMoreData = async () => {
      const data = await node.createIdentity();
      return data;
    };
    fetchMoreData()
      .then((fetchedMoreData) => {
        console.log(fetchedMoreData);
        //setData({
        //  pending: false,
        //  diagnostics: fetchedData
        //});
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      {data && (
        <dl>
          <dt>Genesis Hash</dt>
          <dd>{data.pending == false ? data.diagnostics[0] : ''}</dd>
          <dt>Chain</dt>
          <dd>{data.pending == false ? data.diagnostics[1] : ''}</dd>
          <dt>Node Name</dt>
          <dd>{data.pending == false ? data.diagnostics[2] : ''}</dd>
          <dt>Node Version</dt>
          <dd>{data.pending == false ? data.diagnostics[3] : ''}</dd>
        </dl>
      )}
    </div>
  );
}

export default Diagnostics;
