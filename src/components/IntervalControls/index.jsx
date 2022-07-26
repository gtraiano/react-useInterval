import React from "react";

const IntervalControls = ({ props }) => {
    return (
        <>
        <h2>Interval controls</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <ul className="flex-outer">
            <li>
              <label htmlFor="is_running">running</label>
              <input
                id="is_running"
                type="checkbox"
                checked={props.isRunning.value}
                onChange={props.isRunning.handleIsRunningChange}
              />
            </li>
            <li>
              <label htmlFor="delay">delay</label>
              <input
                id="delay"
                type="range"
                min="100"
                max="10000"
                title={props.delay.value}
                value={props.delay.value}
                onChange={props.delay.handleDelayChange}
              />
            </li>
            <li style={{ marginTop: "-1.75rem" }}>
              <label />
              <input
                type="number"
                min="100"
                max="10000"
                step="100"
                value={props.delay.value}
                onChange={props.delay.handleDelayChange}
              />
            </li>
            <li>
              <label htmlFor="active_callback">callback</label>
              <select
                id="active_callback"
                value={props.activeCb.value}
                onChange={props.activeCb.handleActiveCbChange}
              >
                {props.callbacksNames.map((cb, i) => (
                  <option key={i} value={i}>
                    {cb}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <button
                style={{ marginRight: "auto", marginTop: "2%" }}
                onClick={() => { props.elapsed.setCount(0); }}
              >
                reset elapsed
              </button>
            </li>
          </ul>
        </form>
        </>
    )
}

export default IntervalControls;