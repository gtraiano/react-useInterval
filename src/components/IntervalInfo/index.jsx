const IntervalInfo = ({ props }) => {
    return (
        <>
        <h2>Interval info</h2>
        <article>
          <ul className="flex-outer">
            <li>
              <label>id</label>
              <label>{props.id}</label>
            </li>
            <li>
              <label>active callback</label>
              <label className="as-is">{props.activeCallbackName}</label>
            </li>
            <li>
              <label>delay</label>
              <label>{props.delay}</label>
            </li>
            <li>
              <label>elapsed</label>
              <label>{props.elapsed}</label>
            </li>
          </ul>
        </article>
        </>
    )
}

export default IntervalInfo;