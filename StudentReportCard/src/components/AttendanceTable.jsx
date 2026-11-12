import { attendanceTone } from "../utils";

function AttendanceTable({ attendance }) {
  const { months, d, a, p, pct } = attendance;
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Working days</th>
            <th>Absent</th>
            <th>Present</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {months.map(([m, md, ma, mp]) => {
            const v = (mp / md) * 100;
            return (
              <tr key={m}>
                <td><b>{m}</b></td>
                <td>{md}</td>
                <td>{ma}</td>
                <td>{mp}</td>
                <td className={v >= 75 ? "pass" : "fail"}>{v.toFixed(1)}%</td>
              </tr>
            );
          })}
          <tr className="att-total">
            <td>Total</td>
            <td>{d}</td>
            <td>{a}</td>
            <td>{p}</td>
            <td className={attendanceTone(pct) === "bad" ? "fail" : "pass"}>{pct.toFixed(2)}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;