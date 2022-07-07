import React, {useState, useEffect} from 'react';
import {filter} from 'rxjs';
import {useServiceContext} from '../../contexts/ServiceContext';

export function useAccount() {
  const {keymanager} = useServiceContext();
  const [account, setAccount] = useState(undefined);

  useEffect(() => {
    const sub = keymanager.pair$.pipe(filter((a) => !!a)).subscribe((a) => {
      setAccount(a);
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return account;
}
