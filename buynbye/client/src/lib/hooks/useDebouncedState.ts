import React, { useEffect, useRef, useState, type SetStateAction } from 'react';

export default function useDebounceState<T>(
  value: T,
  delay: number
): [T, React.Dispatch<SetStateAction<T>>] {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [termValue, setTermValue] = useState(value);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeoutRef = useRef<null | any>(null);

  useEffect(() => {
    // Clear previous timeout if it exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to update the debounced value
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(termValue);
    }, delay);

    // Cleanup function to clear the timeout on unmount or dependency change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [termValue, delay]); // Re-run effect if value or delay changes

  return [debouncedValue, setTermValue];
}
