import React, {useState, useEffect} from 'react';
import PageTitle from '../../components/PageTitle';
import RatingSubNav from './RatingSubNav';
import {useServiceContext} from '../../../contexts/ServiceContext';

function Rating() {
  const {node} = useServiceContext();
  const [nodeApiReady, setNodeApiReady] = useState(true);
  const [ratingList, setRatingList] = useState([]);

  useEffect(() => {
    const sub = node.ratingSignals$.subscribe((d) => {
      setRatingList(d);
    });

    if (node.apiNotReady()) {
      setNodeApiReady(false);
    } else {
      node.checkRatingSignalList();
      setNodeApiReady(true);
    }

    return () => {
      sub.remove();
    };
  }, [node]);

  return (
    <div className="flex flex-row">
      <div className="basis-1/4">
        <RatingSubNav />
      </div>
      <div className="basis-3/4 px-8">
        <PageTitle>Rating Signal Activity</PageTitle>
        {!nodeApiReady && (
          <div className="error" role="alert">
            The Fennel Node is currently unavailable. Please try again later.
          </div>
        )}
        {nodeApiReady && (
          <div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Origin</th>
                    <th>Target</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(ratingList).map(([_, value], index) => (
                    <tr key={index}>
                      <td>{value.origin}</td>
                      <td>{value.target}</td>
                      <td>{value.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rating;
