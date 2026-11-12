import { Link } from "react-router-dom";
import StudentHeader from "../components/StudentHeader";
import StatCard from "../components/StatCard";
import TrendChart from "../components/TrendChart";
import Bar from "../components/Bar";
import { student, getOverall } from "../data";
import { ROMAN, attendanceTone, gradeTone } from "../utils";

const GRADES = ["S", "A+", "A", "B+", "B", "C+", "C"];

function Home() {
  const o = getOverall();
  const current = ROMAN[student.currentSemester];

  const rows = o.done.flatMap((s) =>
    s.rows.filter((r) => r.credits > 0).map((r) => ({ ...r, sem: s.n }))
  );
  const dist = GRADES.map((g) => ({ grade: g, count: rows.filter((r) => r.grade === g).length }));
  const maxCount = Math.max(...dist.map((d) => d.count), 1);
  const top = [...rows].sort((a, b) => b.gp - a.gp || b.credits - a.credits).slice(0, 5);
  const best = o.done.reduce((a, b) => (b.sgpa > a.sgpa ? b : a));
  const trend = o.done.map((s) => ({ label: `Sem ${s.n}`, value: s.sgpa }));

  return (
    <>
      <StudentHeader
        badge={`Currently in Semester ${student.currentSemester}`}
        extra={[["Overall CGPA", o.cgpa.toFixed(2)]]}
      />

      <div className="stats">
        <StatCard
          label="CGPA"
          value={o.cgpa.toFixed(2)}
          hint={`Best: Sem ${best.n} (${best.sgpa.toFixed(2)})`}
        />
        <StatCard
          label="Credits earned"
          value={`${o.earned}/${o.credits}`}
          hint={`${o.done.length} semesters completed`}
          tone="info"
        />
        <StatCard
          label="Arrear subjects"
          value={o.arrears}
          hint={o.arrears === 0 ? "No pending arrears 🎉" : "Needs clearing"}
          tone={o.arrears === 0 ? "ok" : "bad"}
        />
        <StatCard
          label="Overall attendance"
          value={`${o.attendance.toFixed(1)}%`}
          hint={o.attendance >= 75 ? "Above 75% requirement" : "Below 75% requirement"}
          tone={attendanceTone(o.attendance)}
        />
      </div>

      <div className="grid-2">
        <section className="card">
          <h3>SGPA trend</h3>
          <TrendChart data={trend} />
        </section>

        <section className="card">
          <h3>Grade distribution</h3>
          <div className="dist">
            {dist.map((d) => (
              <div key={d.grade} className="dist__row">
                <span className={`chip chip--${gradeTone(d.grade)}`}>{d.grade}</span>
                <Bar value={(d.count / maxCount) * 100} tone={gradeTone(d.grade)} />
                <b>{d.count}</b>
              </div>
            ))}
          </div>
        </section>
      </div>

      <h2 className="section-title">Semesters</h2>
      <div className="sem-grid">
        {o.all.map((s) => (
          <Link key={s.n} to={`/semester/${s.n}`} className="card sem-card">
            <div className="sem-card__top">
              <span>Semester {s.n}</span>
              {s.n === current && <span className="tag">Current</span>}
            </div>
            <div>
              <div className={`sem-card__sgpa ${s.ongoing ? "is-empty" : ""}`}>
                {s.ongoing ? "In progress" : s.sgpa.toFixed(2)}
              </div>
              <small className="muted">{s.ongoing ? "Results not published" : "SGPA"}</small>
            </div>
            <div>
              <div className="sem-card__meta">
                <span>Attendance</span>
                <b>{s.attendance.pct.toFixed(1)}%</b>
              </div>
              <Bar value={s.attendance.pct} tone={attendanceTone(s.attendance.pct)} />
            </div>
            <div className="sem-card__meta">
              <span>{s.ongoing ? "Credits —" : `Credits ${s.earned}/${s.credits}`}</span>
              <span>{s.ongoing ? "" : `Arrears ${s.arrears}`}</span>
            </div>
            <span className="sem-card__cta">View details →</span>
          </Link>
        ))}
      </div>

      <h2 className="section-title">Top performing subjects</h2>
      <section className="card">
        <ol className="rank">
          {top.map((r, i) => (
            <li key={`${r.sem}-${r.code}`}>
              <span className="rank__n">{i + 1}</span>
              <span className="rank__name">
                {r.name}
                <small>Semester {r.sem} · {r.code} · {r.credits} credits</small>
              </span>
              <span className={`chip chip--${gradeTone(r.grade)}`}>{r.grade}</span>
              <b className="rank__score">{r.gp}</b>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

export default Home;