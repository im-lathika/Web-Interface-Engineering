function Bar({ value, tone }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className={`bar__fill ${tone ? `bar__fill--${tone}` : ""}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export default Bar;
