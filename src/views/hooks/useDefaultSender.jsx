import React, {useState, useEffect} from 'react';
import {filter} from 'rxjs';
import {useServiceContext} from '../../contexts/ServiceContext';

export function useDefaultSender() {
  const {contactsManager} = useServiceContext();
  const [sender, setDefaultSender] = useState(undefined);

  useEffect(() => {
    const sub = contactsManager?.defaultSender$
      //.pipe(filter((i) => !!i)) This line never let the value through.
      .subscribe((i) => {
        setDefaultSender(i);
      });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return sender;
}
