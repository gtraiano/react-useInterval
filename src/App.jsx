import "./styles.css";
import { useInterval } from "./hooks/useInterval";
import { useCallback, useEffect, useState } from "react";
import HeartBeat from "./components/HeartBeat";

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
      {/* interval info */}
      <section className="container">
        <h2>Interval info</h2>
        <article>
          <ul className="flex-outer">
            <li>
              <label>id</label>
              <label>{id}</label>
            </li>
            <li>
              <label>active callback</label>
              <label className="as-is">{callback.name}</label>
            </li>
            <li>
              <label>delay</label>
              <label>{delay}</label>
            </li>
            <li>
              <label>elapsed</label>
              <label>{count}</label>
            </li>
          </ul>
        </article>
      </section>

      {/* interval controls */}
      <section className="container">
        <h2>Interval controls</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <ul className="flex-outer">
            <li>
              <label htmlFor="is_running">running</label>
              <input
                id="is_running"
                type="checkbox"
                checked={isRunning}
                onChange={handleIsRunningChange}
              />
            </li>
            <li>
              <label htmlFor="delay">delay</label>
              <input
                id="delay"
                type="range"
                min="100"
                max="10000"
                title={delay}
                value={delay}
                onChange={handleDelayChange}
              />
            </li>
            <li style={{ marginTop: "-1.75rem" }}>
              <label />
              <input type="number" min="100" max="10000" step="100" value={delay} onChange={handleDelayChange} />
            </li>
            <li>
              <label htmlFor="active_callback">callback</label>
              <select
                id="active_callback"
                value={activeCb}
                onChange={handleActiveCbChange}
              >
                {callbacks.map((cb, i) => (
                  <option key={i} value={i}>
                    {cb.name}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <button
                style={{ marginRight: "auto", marginTop: "2%" }}
                onClick={() => {
                  setCount(0);
                }}
              >
                reset elapsed
              </button>
            </li>
          </ul>
        </form>
      </section>
      <section>
        <HeartBeat alive={isRunning} />
    </section>
    </div>
  );
}

