import React, { useState, useEffect } from 'react';
import { filter } from 'rxjs';
import { useServiceContext } from '../../contexts/ServiceContext';

export function useDefaultSender() {
  const { contactsManager } = useServiceContext();
  const [sender, setDefaultSender] = useState(undefined);

  useEffect(() => {
    const sub = contactsManager?.defaultSender$
      .pipe(filter((i) => !!i))
      .subscribe((i) => {
        console.log('defaultSender changed:', i);
        setDefaultSender(i);
      });

    return () => {
      sub.unsubscribe();
    };
  }, [contactsManager?.defaultSender$]);

  return sender;
}
