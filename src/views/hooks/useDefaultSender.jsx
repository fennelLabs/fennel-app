import React, {useState, useEffect} from 'react';
import {filter} from 'rxjs';
import {useServiceContext} from '../../contexts/ServiceContext';

export function useDefaultSender() {
  const {contactsManager} = useServiceContext();
  const [sender, setDefaultSender] = useState(undefined);

  useEffect(() => {
    // It all dropped into place after Isaac's review.
    // The problem wasn't that defaultSender isn't
    // being returned correctly, it's that in the case where
    // this error was occurring it genuinely was undefined.
    const sub = contactsManager?.defaultSender$
    // I understand fully why these null checks are useful and why the pipe matters and what it does, the issue is that
    // if this next line _doesn't_ catch anything
      .pipe(filter((i) => !!i)) // (This line comes back because I misremembered what was causing the problem.)
      .subscribe((i) => {
        // This never fires, and if you
        setDefaultSender(i);
      });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  // console.log(sender) here when that subscribe never fired you'd get back `undefined` which is what caused the bug in the first place.

  return sender;
}
