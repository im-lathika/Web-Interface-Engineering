import { useParams, Link } from "react-router-dom";
import StudentHeader from "../components/StudentHeader";
import StatCard from "../components/StatCard";
import MarkTable from "../components/MarkTable";
import AttendanceTable from "../components/AttendanceTable";
import { getOverall } from "../data";
import { attendanceTone } from "../utils";

function downloadCsv(sem) {
  const head = ["Code", "Subject", "Credits", "Grade", "Grade point", "Result"];
  const body = sem.rows.map((r) => [r.code, r.name, r.credits, r.grade, r.gp, r.result]);
  const csv = [head, ...body]
    .map((line) => line.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `semester-${sem.n}-results.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function ReportCard() {
  const { id } = useParams();
  const n = Number(id);
  const overall = getOverall();
  const sem = overall.all.find((s) => s.n === n);

  if (!sem) {
    return (
      <div className="card empty">
        <h2>Semester not found</h2>
        <p>There is no data for semester “{id}”.</p>
        <Link className="btn btn--primary" to="/">Back to home</Link>
      </div>
    );
  }

  const total = overall.all.length;
  const att = sem.attendance;
  const upToNow = overall.done.filter((s) => s.n <= n);
  const credits = upToNow.reduce((s, x) => s + x.credits, 0);
  const points = upToNow.reduce((s, x) => s + x.points, 0);
  const prev = overall.done.find((s) => s.n === n - 1);
  const diff = prev && sem.sgpa !== null ? sem.sgpa - prev.sgpa : null;

  return (
    <>
      <StudentHeader
        badge={sem.ongoing ? `Semester ${n} · In progress` : `Semester ${n} · ${sem.exam}`}
        extra={[["Attendance", `${att.pct.toFixed(2)}%`]]}
      />

      {sem.ongoing ? (
        <div className="banner banner--info">
          ⏳ Semester {n} is in progress. Results are not published yet. Attendance is shown below.
        </div>
      ) : (
        <div className={`banner ${sem.arrears === 0 ? "banner--ok" : "banner--bad"}`}>
          {sem.arrears === 0
            ? "✅ All subjects cleared in this semester"
            : `⚠️ ${sem.arrears} arrear subject(s) in this semester`}
        </div>
      )}

      <div className="stats">
        {sem.ongoing ? (
          <>
            <StatCard label="Attendance" value={`${att.pct.toFixed(2)}%`} tone={attendanceTone(att.pct)} />
            <StatCard label="Working days" value={att.d} tone="info" />
            <StatCard label="Days present" value={att.p} tone="ok" />
            <StatCard label="Days absent" value={att.a} tone="warn" />
          </>
        ) : (
          <>
            <StatCard
              label="Semester GPA"
              value={sem.sgpa.toFixed(2)}
              hint={diff === null ? "First semester" : `${diff >= 0 ? "▲" : "▼"} ${Math.abs(diff).toFixed(2)} vs Sem ${n - 1}`}
            />
            <StatCard label={`CGPA till Sem ${n}`} value={(points / credits).toFixed(2)} tone="info" />
            <StatCard label="Credits earned" value={`${sem.earned}/${sem.credits}`} tone="info" />
            <StatCard label="Attendance" value={`${att.pct.toFixed(2)}%`} tone={attendanceTone(att.pct)} />
          </>
        )}
      </div>

      {!sem.ongoing && (
        <>
          <h2 className="section-title">Semester {n} results</h2>
          <MarkTable rows={sem.rows} />
        </>
      )}

      <h2 className="section-title">Attendance (month-wise)</h2>
      <AttendanceTable attendance={att} />

      <div className="actions">
        {n > 1 && <Link className="btn" to={`/semester/${n - 1}`}>← Previous</Link>}
        <button className="btn btn--primary" onClick={() => window.print()}>🖨 Print</button>
        {!sem.ongoing && <button className="btn" onClick={() => downloadCsv(sem)}>⬇ Download CSV</button>}
        {n < total && <Link className="btn" to={`/semester/${n + 1}`}>Next →</Link>}
      </div>
    </>
  );
}

export default ReportCard;