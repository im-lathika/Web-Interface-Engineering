import { useState } from "react";
import Bar from "./Bar";
import { gradeTone } from "../utils";

const COLS = [
  { key: "code", label: "Code" },
  { key: "name", label: "Subject", left: true },
  { key: "credits", label: "Credits" },
  { key: "gp", label: "Grade" },
  { key: "result", label: "Result" },
];

function MarkTable({ rows }) {
  const [sort, setSort] = useState({ key: null, dir: "asc" });

  const sorted = sort.key
    ? [...rows].sort((a, b) => {
        const x = a[sort.key];
        const y = b[sort.key];
        const c = typeof x === "string" ? x.localeCompare(y) : x - y;
        return sort.dir === "asc" ? c : -c;
      })
    : rows;

  const toggle = (key) =>
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
    );

  const arrow = (key) => (sort.key === key ? (sort.dir === "asc" ? "▲" : "▼") : "↕");

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {COLS.map((c) => (
              <th key={c.key} className={c.left ? "left" : ""}>
                <button onClick={() => toggle(c.key)} title={`Sort by ${c.label}`}>
                  {c.label} <span className="sort-hint">{arrow(c.key)}</span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => {
            const tone = gradeTone(r.grade);
            return (
              <tr key={r.code}>
                <td className="code">{r.code}</td>
                <td className="left">
                  {r.name}
                  {r.credits === 0 && <span className="tag tag--warn"> Audit · 0 credit</span>}
                </td>
                <td>{r.credits}</td>
                <td>
                  <div className="total">
                    <span>
                      <span className={`chip chip--${tone}`}>{r.grade}</span>
                      <span className="gp"> · {r.gp} pts</span>
                    </span>
                    <Bar value={r.gp * 10} tone={tone} />
                  </div>
                </td>
                <td className={r.result === "PASS" ? "pass" : "fail"}>{r.result}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MarkTable;