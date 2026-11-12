import { student } from "../data";

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StudentHeader({ badge, extra = [] }) {
  const details = [
    ["Register No", student.regNo],
    ["Department", student.department],
    ["Batch", student.batch],
    ...extra,
  ];

  return (
    <section className="hero">
      <p className="hero__college">{student.college}</p>
      <div className="hero__main">
        <div className="avatar">{initials(student.name)}</div>
        <div>
          <h1>{student.name}</h1>
          {badge && <span className="pill">{badge}</span>}
        </div>
      </div>
      <dl className="hero__details">
        {details.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default StudentHeader;
