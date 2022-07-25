// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import { useEffect, useRef } from "react";

const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  const savedId = useRef(undefined);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      savedId.current = setInterval(tick, delay);
      return () => clearInterval(savedId.current);
    }
  }, [delay]);

  return [savedId.current];
};

export { useInterval };
