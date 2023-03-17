import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const mql = window.matchMedia(query);
  const [isMatch, setIsMatch] = useState(mql.matches);

  useEffect(() => {
    const handleMediaChange = function (data) {
      setIsMatch(data.matches);
    };
    mql.addEventListener('change', handleMediaChange);

    return () => {
      mql.removeEventListener('change', handleMediaChange);
    };
  }, [mql]);

  return isMatch;
}
