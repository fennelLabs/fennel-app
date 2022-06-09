import React, {useState, useEffect} from 'react';
import Node from '../../../services/Node';

function Diagnostics() {
  const [data, setData] = useState({pending: undefined, diagnostics: null});

  useEffect(() => {
    setData({pending: true, diagnostics: {}});

    const fetchData = async () => {
      const node = new Node();
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
  }, []);

  return (
    <div>
      {' '}
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
