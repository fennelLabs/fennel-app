import React, {useState, useEffect} from 'react';
import {filter} from 'rxjs';
import {useServiceContext} from '../../contexts/ServiceContext';

export function useAccount() {
  const {keymanager, accountBalanceService} = useServiceContext();

  const [address, setAddress] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [balance, setBalance] = useState(accountBalanceService.balance);

  useEffect(() => {
    let subscriptions = [];

    subscriptions.push(
      keymanager.address$.pipe(filter((a) => !!a)).subscribe((a) => {
        setAddress(a);
      })
    );

    subscriptions.push(
      keymanager.pair$.pipe(filter((a) => !!a)).subscribe((a) => {
        setAccount(a);
      })
    );

    subscriptions.push(
      accountBalanceService.balance$.subscribe((d) => {
        setBalance(d);
      })
    );

    return () => {
      subscriptions.forEach((s) => {
        s.unsubscribe();
      });
    };
  }, []);

  return {address, account, balance};
}
