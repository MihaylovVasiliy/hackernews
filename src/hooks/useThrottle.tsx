import { useState, useEffect } from 'react';

function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());

  useEffect(() => {
    const timeSinceLastUpdate = Date.now() - lastUpdated;
    if (timeSinceLastUpdate >= delay) {
      setThrottledValue(value);
      setLastUpdated(Date.now());
    } else {
      const timeoutId = setTimeout(() => {
        setThrottledValue(value);
        setLastUpdated(Date.now());
      }, delay - timeSinceLastUpdate);
      return () => clearTimeout(timeoutId);
    }
  }, [value, delay, lastUpdated]);

  return throttledValue;
}

export default useThrottle;
