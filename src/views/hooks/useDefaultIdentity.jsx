import React, {useState, useEffect} from 'react';
import {filter} from 'rxjs';
import {useServiceContext} from '../../contexts/ServiceContext';

export function useDefaultIdentity() {
  const {node} = useServiceContext();
  const [identity, setDefaultIdentity] = useState(undefined);

  useEffect(() => {
    const sub = node.defaultIdentity$
      .pipe(filter((i) => !!i))
      .subscribe((i) => {
        setDefaultIdentity(i);
      });

    return () => {
      sub.unsubscribe();
    };
  }, [node.defaultIdentity$]);

  return identity;
}
