function TrendChart({ data }) {
  const W = 600;
  const H = 260;
  const pad = { t: 32, r: 48, b: 40, l: 56 };
  const values = data.map((d) => d.value);
  const min = Math.max(0, Math.floor(Math.min(...values)) - 1);
  const max = 10;
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;

  const inset = 48;
  const x = (i) =>
    pad.l + (data.length === 1 ? innerW / 2 : inset + (i * (innerW - inset * 2)) / (data.length - 1));
  const y = (v) => pad.t + innerH * (1 - (v - min) / (max - min));

  const line = data.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d.value)}`).join(" ");
  const area = `${line} L${x(data.length - 1)},${pad.t + innerH} L${x(0)},${pad.t + innerH} Z`;
  const ticks = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="SGPA trend by semester">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {ticks.map((t) => (
        <g key={t}>
          <line className="grid" x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} />
          <text className="axis" x={pad.l - 10} y={y(t) + 4} textAnchor="end">{t}</text>
        </g>
      ))}

      <path d={area} fill="url(#trendFill)" />
      <path className="line" d={line} />

      {data.map((d, i) => (
        <g key={d.label}>
          <circle className="dot" cx={x(i)} cy={y(d.value)} r="6" />
          <text className="val" x={x(i)} y={y(d.value) - 14}>{d.value.toFixed(2)}</text>
          <text className="axis" x={x(i)} y={H - 12} textAnchor="middle">{d.label}</text>
        </g>
      ))}
    </svg>
  );
}

export default TrendChart;