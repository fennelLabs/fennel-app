import React, {useState, useEffect} from 'react';
import PageTitle from '../../components/PageTitle';
import RatingSubNav from './RatingSubNav';
import {useServiceContext} from '../../../contexts/ServiceContext';
import Button from '../../components/Button';
import {Link} from 'react-router-dom';

function Rating() {
  const {node} = useServiceContext();
  const [nodeApiReady, setNodeApiReady] = useState(true);
  const [ratingList, setRatingList] = useState([]);
  const [origin, setOrigin] = useState('');
  const [target, setTarget] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const sub = node.ratingSignals$.subscribe((d) => setRatingList(d));

    if (node.apiNotReady()) {
      setNodeApiReady(false);
    } else {
      node.checkRatingSignalList();
      setNodeApiReady(true);
    }

    return () => sub.remove();
  }, [node]);

  useEffect(() => {
    const sub = node.queriedRating$.subscribe((d) => setRating(d));
    return () => sub.remove();
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
            <label htmlFor="origin">Origin</label>
            <input
              name="origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
            <label htmlFor="target">Target</label>
            <input
              name="target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
            <label htmlFor="rating">Rating</label>
            <input name="rating" value={rating} readOnly={true} />
            <Button
              onClick={() => {
                node.checkListForRating(origin, target);
              }}
            >
              Query
            </Button>
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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(ratingList).map(([_, value], index) => (
                    <tr key={index}>
                      <td>{value.origin}</td>
                      <td>{value.target}</td>
                      <td>{value.rating}</td>
                      <td>
                        <Link
                          to="/rating/update"
                          state={{
                            startTarget: value.target,
                            startRating: value.rating
                          }}
                        >
                          Update
                        </Link>
                      </td>
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
