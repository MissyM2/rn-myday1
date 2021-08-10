import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it change.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;