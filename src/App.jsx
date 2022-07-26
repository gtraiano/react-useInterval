import "./styles.css";
import { useInterval } from "./hooks/useInterval";
import { useCallback, useEffect, useState } from "react";
import HeartBeat from "./components/HeartBeat";
import IntervalControls from "./components/IntervalControls";
import IntervalInfo from "./components/IntervalInfo";

export default function App() {
  // interval controls
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);

  // available callbacks (attention: must be regenerated on delay update)
  const callbacks = [
    function increment(step) {
      setCount((c) => c + step);
    },
    function decrement(step) {
      setCount((c) => c - step);
    }
  ];

  // callback controls
  const [activeCb, setActiveCb] = useState(0); // active callback index in callbacks array
  const callback = useCallback(() => { callbacks[activeCb](delay) }, [activeCb, delay]); // callback to use in interval

  // useInterval
  const [id] = useInterval(callback, isRunning ? delay : null);

  // form change handlers
  const handleDelayChange = (e) => {
    setDelay(Number(e.target.value));
  };

  const handleIsRunningChange = (e) => {
    setIsRunning(e.target.checked);
  };

  const handleActiveCbChange = (e) => {
    setActiveCb(Number(e.target.value));
  };

  useEffect(() => {
    return () => clearInterval(id);
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty('--heartbeat-rate', `${(delay/1000).toFixed(3)}s`); // adjust heartbeat animation speed
  }, [delay]);

  return (
    <div className="App">
      <section className="container">
        <IntervalInfo props={{
          id,
          activeCallbackName: callbacks[activeCb].name,
          delay,
          elapsed: count
        }} />
      </section>
      <section className="container">
        <IntervalControls props={
          {
            isRunning: {
              value: isRunning,
              handleIsRunningChange
            },
            delay: {
              value: delay,
              handleDelayChange
            },
            callbacksNames: callbacks.map(cb => cb.name),
            activeCb: {
              value: activeCb,
              handleActiveCbChange
            },
            elapsed: {
              setCount
            }
          }
        }/>
      </section>
      <section>
        <HeartBeat alive={isRunning} />
    </section>
    </div>
  );
}

