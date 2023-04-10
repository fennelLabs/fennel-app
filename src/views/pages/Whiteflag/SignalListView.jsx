/// A React component with a list view used for displaying whiteflag signals.
import React, { useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import WhiteflagSignalListView from './WhiteflagSignalListView';

export function SignalListView() {
  const [signalList, setSignalList] = useState(null);
  useEffect(() => {}, []);

  return (
    <div className="signal-list-view">
      <PageTitle>Whiteflag Signals</PageTitle>
      <WhiteflagSignalListView itemList={signalList ?? []} />
    </div>
  );
}
