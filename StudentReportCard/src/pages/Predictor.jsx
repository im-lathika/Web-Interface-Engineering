import { useState } from "react";
import StatCard from "../components/StatCard";
import { getOverall } from "../data";

function Predictor() {
  const o = getOverall();
  const points = o.all.reduce((s, x) => s + x.points, 0);

  const [credits, setCredits] = useState(20);
  const [expected, setExpected] = useState(8.5);
  const [target, setTarget] = useState(8.5);

  const cr = Math.max(credits, 1);
  const projected = (points + expected * cr) / (o.credits + cr);
  const required = (target * (o.credits + cr) - points) / cr;
  const maxPossible = (points + 10 * cr) / (o.credits + cr);

  let verdict;
  if (required <= 0) verdict = "You already have this CGPA — it can't drop below it with passing grades.";
  else if (required > 10)
    verdict = `Not reachable in one semester. The maximum CGPA you can reach is ${maxPossible.toFixed(2)}.`;
  else verdict = `You need an SGPA of ${required.toFixed(2)} next semester.`;

  return (
    <>
      <h2 className="section-title">CGPA predictor</h2>
      <div className="stats">
        <StatCard label="Current CGPA" value={o.cgpa.toFixed(2)} hint={`${o.credits} credits so far`} />
        <StatCard label="Projected CGPA" value={projected.toFixed(2)} tone="info" hint={`If next SGPA = ${expected.toFixed(1)}`} />
        <StatCard label="Max possible" value={maxPossible.toFixed(2)} tone="ok" hint="If you score SGPA 10.0" />
      </div>

      <div className="grid-2 equal">
        <section className="card">
          <h3>What if I score…</h3>
          <div className="form">
            <div className="field">
              <label htmlFor="credits">Next semester credits</label>
              <input id="credits" type="number" min="1" max="40" value={credits}
                onChange={(e) => setCredits(Number(e.target.value))} />
            </div>
            <div className="field">
              <label htmlFor="expected">Expected SGPA <b>{expected.toFixed(1)}</b></label>
              <input id="expected" type="range" min="0" max="10" step="0.1" value={expected}
                onChange={(e) => setExpected(Number(e.target.value))} />
            </div>
            <p className="result">Projected CGPA: <b>{projected.toFixed(2)}</b></p>
          </div>
        </section>

        <section className="card">
          <h3>I want a target CGPA…</h3>
          <div className="form">
            <div className="field">
              <label htmlFor="target">Target CGPA <b>{target.toFixed(1)}</b></label>
              <input id="target" type="range" min="5" max="10" step="0.1" value={target}
                onChange={(e) => setTarget(Number(e.target.value))} />
            </div>
            <p className="result">{verdict}</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Predictor;
