import { useState, useEffect, useRef, useMemo } from "react";
import { profile, certs, categories, ANTHROPIC_TOTAL, skills, projects, timeline, education } from "./data";

const BASE = import.meta.env.BASE_URL;
const imgSrc = (c) => `${BASE}certs/${c.file}`;

function PageHead({ title, children }) {
  return <div className="page-head"><h1>{title}</h1>{children && <p>{children}</p>}</div>;
}

/* ---------- Certificate pieces ---------- */
function CertImg({ cert }) {
  const [bad, setBad] = useState(false);
  if (bad) return <div className="ph"><span>{cert.issuer}</span></div>;
  return <img src={imgSrc(cert)} alt={cert.title} loading="lazy" onError={() => setBad(true)} />;
}
function CertCard({ cert, onOpen }) {
  return (
    <button className="cert-card" onClick={() => onOpen(cert)} aria-label={`View certificate: ${cert.title}`}>
      <div className="thumb"><CertImg cert={cert} /><span className="zoom">View</span></div>
      <div className="cert-meta"><span className="badge">{cert.issuer}</span><small>{cert.date}</small></div>
      <h3>{cert.title}</h3>
      <p>Semester {cert.sem} &middot; {cert.cat}</p>
    </button>
  );
}
function CertModal({ list, index, onClose, onMove }) {
  const cert = list[index];
  const closeRef = useRef(null);
  useEffect(() => {
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.body.style.overflow = prevOverflow; prevFocus?.focus?.(); };
  }, []);
  useEffect(() => {
    const f = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [onClose, onMove]);
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-box" role="dialog" aria-modal="true" aria-label={cert.title} onClick={(e) => e.stopPropagation()}>
        <div className="modal-img"><CertImg key={cert.file} cert={cert} /></div>
        <div className="modal-info">
          <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
          <span className="badge" style={{ alignSelf: "flex-start" }}>{cert.issuer}</span>
          <h2>{cert.title}</h2>
          <dl>
            <div><dt>Category</dt><dd>{cert.cat}</dd></div>
            <div><dt>Semester</dt><dd>Semester {cert.sem}</dd></div>
            <div><dt>Date</dt><dd>{cert.date}</dd></div>
          </dl>
          <a className="btn ghost" href={imgSrc(cert)} download>Download certificate</a>
          <div className="modal-nav">
            <button className="btn ghost sm" onClick={() => onMove(-1)} disabled={list.length < 2}>Previous</button>
            <button className="btn ghost sm" onClick={() => onMove(1)} disabled={list.length < 2}>Next</button>
          </div>
          <div className="counter">{index + 1} of {list.length}</div>
        </div>
      </div>
    </div>
  );
}
function Tab({ v, cur, set, count, children }) {
  return (
    <button className={"tab" + (v === cur ? " on" : "")} aria-pressed={v === cur} onClick={() => set(v)}>
      {children}{count !== undefined && <em>{count}</em>}
    </button>
  );
}
function Count({ to }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { i++; setN(i); if (i >= to) clearInterval(t); }, Math.max(15, Math.floor(900 / to)));
    return () => clearInterval(t);
  }, [to]);
  return <strong aria-label={String(to)}>{n}</strong>;
}

/* ---------- Pages ---------- */
export function Home({ go }) {
  const latest = certs.filter((c) => c.sem === 2).slice(0, 3);
  const [selected, setSelected] = useState(null);
  return (
    <>
      <section className="hero">
        <div className="hero-in">
          <h1>{profile.name}</h1>
          <div className="role">{profile.role}</div>
          <p className="lead">{profile.summary}</p>
          <div className="actions">
            <button className="btn" onClick={() => go("projects")}>View projects</button>
            <button className="btn ghost" onClick={() => go("certs")}>See certificates</button>
          </div>
        </div>
        <div className="hero-photo-wrap hero-in">
          <img src={BASE + "profile.jpg"} alt={profile.name} className="hero-photo" />
        </div>
      </section>
      <section className="stats" aria-label="At a glance">
        <div className="stat"><Count to={certs.length} /><span>Certificates</span></div>
        <div className="stat"><Count to={skills.reduce((a, g) => a + g.items.length, 0)} /><span>Skills</span></div>
        <div className="stat"><Count to={projects.length} /><span>Projects</span></div>
        <div className="stat"><Count to={2} /><span>Semesters</span></div>
      </section>
      <div className="sub">
        <h2>Latest certificates</h2>
        <button className="btn ghost sm" onClick={() => go("certs")}>View all {certs.length}</button>
      </div>
      <div className="grid certs">{latest.map((c) => <CertCard key={c.file} cert={c} onOpen={setSelected} />)}</div>
      {selected && (
        <CertModal list={latest} index={latest.indexOf(selected)} onClose={() => setSelected(null)}
          onMove={(d) => setSelected(latest[(latest.indexOf(selected) + d + latest.length) % latest.length])} />
      )}
    </>
  );
}
export function About() {
  return (
    <>
      <PageHead title="About me">{profile.summary}</PageHead>
      <div className="two">
        <section className="panel">
          <h2>Details</h2>
          <dl className="facts">
            <div><dt>Department</dt><dd>{profile.department}</dd></div>
            <div><dt>College</dt><dd>{profile.college}</dd></div>
            <div><dt>Location</dt><dd>{profile.location}</dd></div>
            <div><dt>Email</dt><dd>{profile.email}</dd></div>
          </dl>
        </section>
        <section className="panel">
          <h2>Education</h2>
          {education.map((e) => (
            <div className="edu" key={e.level}><b>{e.level}</b><span>{e.place}</span>{e.score && <em>{e.score}</em>}</div>
          ))}
        </section>
      </div>
      <section className="panel" style={{ marginTop: 20 }}>
        <h2>Career goals</h2>
        <ul className="goals">{profile.goals.map((g) => <li key={g}>{g}</li>)}</ul>
      </section>
      <section className="panel">
        <h2>Interests</h2>
        <div className="chips">{profile.interests.map((i) => <span className="chip" key={i}>{i}</span>)}</div>
      </section>
    </>
  );
}
export function Skills() {
  return (
    <>
      <PageHead title="Skills">Self-rated across the tools and languages I use most.</PageHead>
      <div className="grid">
        {skills.map((g) => (
          <section className="panel" key={g.group}>
            <h2>{g.group}</h2>
            {g.items.map(([name, lvl]) => (
              <div className="bar-row" key={name}>
                <div className="top"><span>{name}</span><span>{lvl}%</span></div>
                <div className="bar" role="progressbar" aria-label={name} aria-valuenow={lvl} aria-valuemin={0} aria-valuemax={100}><i style={{ width: lvl + "%" }} /></div>
              </div>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}
export function Projects() {
  return (
    <>
      <PageHead title="Projects">Web, Java and Python work, with source on GitHub.</PageHead>
      <div className="grid">
        {projects.map((p) => (
          <section className="panel project" key={p.title}>
            {p.shot && <img className="shot" src={BASE + "projects/" + p.shot} alt={p.title + " screenshot"} loading="lazy" />}
            <h2>{p.title}</h2>
            <p>{p.desc}</p>
            <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
            <div className="actions" style={{ marginTop: 4 }}>
              {p.demo && <a className="btn sm" href={p.demo} target="_blank" rel="noreferrer">Live demo</a>}
              {p.link
                ? <a className={"btn sm" + (p.demo ? " ghost" : "")} href={p.link} target="_blank" rel="noreferrer">View code</a>
                : <small>Source available on request</small>}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
export function Certificates() {
  const [sem, setSem] = useState(0);
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("latest");
  const [open, setOpen] = useState(null); // index into `visible`

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = certs.filter((c) =>
      (!sem || c.sem === sem) && (cat === "All" || c.cat === cat) &&
      (c.title + " " + c.issuer).toLowerCase().includes(term));
    return sort === "az" ? [...list].sort((a, b) => a.title.localeCompare(b.title))
      : [...list].sort((a, b) => b.sem - a.sem);
  }, [sem, cat, q, sort]);

  const anthropicDone = certs.filter((c) => c.cat === "AI & Anthropic").length;
  const pct = Math.round((anthropicDone / ANTHROPIC_TOTAL) * 100);
  const countFor = (c) => certs.filter((x) => (!sem || x.sem === sem) && (c === "All" || x.cat === c)).length;
  const reset = () => { setSem(0); setCat("All"); setQ(""); };
  const move = (d) => setOpen((i) => (i + d + visible.length) % visible.length);

  return (
    <>
      <div className="cert-top">
        <PageHead title="Certificates">Courses and workshops, grouped by topic. Select any card to view it full size.</PageHead>
        <div className="cert-total">
          <div><strong>{certs.length}</strong><span>Total</span></div>
          <div><strong>{certs.filter((c) => c.sem === 1).length}</strong><span>Semester 1</span></div>
          <div><strong>{certs.filter((c) => c.sem === 2).length}</strong><span>Semester 2</span></div>
        </div>
      </div>

      <section className="panel academy" aria-label="Anthropic Academy progress">
        <h2>Anthropic Academy</h2>
        <span className="pct">{pct}%</span>
        <p>{anthropicDone} of {ANTHROPIC_TOTAL} courses completed</p>
        <div className="bar" role="progressbar" aria-label="Anthropic courses completed" aria-valuenow={anthropicDone} aria-valuemin={0} aria-valuemax={ANTHROPIC_TOTAL}><i style={{ width: pct + "%" }} /></div>
      </section>

      <div className="toolbar">
        <div className="toolbar-row">
          <div className="seg" role="group" aria-label="Semester">
            {[[0, "All"], [1, "Semester 1"], [2, "Semester 2"]].map(([v, l]) => (
              <button key={v} className={sem === v ? "on" : ""} aria-pressed={sem === v} onClick={() => setSem(v)}>{l}</button>
            ))}
          </div>
          <input className="search" type="search" placeholder="Search by title or issuer" aria-label="Search certificates" value={q} onChange={(e) => setQ(e.target.value)} />
          <select className="sort" aria-label="Sort certificates" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest semester first</option>
            <option value="az">Title A to Z</option>
          </select>
        </div>
        <div className="chips" role="group" aria-label="Category">
          {["All", ...categories].map((c) => <Tab key={c} v={c} cur={cat} set={setCat} count={countFor(c)}>{c}</Tab>)}
        </div>
      </div>

      <p className="result-note" role="status">Showing {visible.length} of {certs.length} certificates</p>
      {visible.length === 0 ? (
        <div className="empty">
          <h3>No certificates match</h3>
          <p>Try a different keyword or clear the filters.</p>
          <button className="btn ghost sm" onClick={reset}>Clear filters</button>
        </div>
      ) : (
        <div className="grid certs">{visible.map((c, i) => <CertCard key={c.file} cert={c} onOpen={() => setOpen(i)} />)}</div>
      )}
      {open !== null && visible[open] && <CertModal list={visible} index={open} onClose={() => setOpen(null)} onMove={move} />}
    </>
  );
}
export function Journey() {
  return (
    <>
      <PageHead title="Journey">What I focused on each semester.</PageHead>
      <div className="timeline">
        {timeline.map((t, i) => (
          <section className="panel" key={t.sem}>
            <h2>{t.sem}</h2>
            <p>{t.note}</p>
            <small>{certs.filter((c) => c.sem === i + 1).length} certificates &middot; {t.focus}</small>
          </section>
        ))}
      </div>
    </>
  );
}
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;
export function Contact() {
  const [status, setStatus] = useState("idle");
  const submit = async (e) => {
    e.preventDefault();
    const form = e.target, f = new FormData(form);
    if (!ENDPOINT) {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Portfolio message from " + f.get("name"))}&body=${encodeURIComponent(f.get("msg") + "\n\nReply to: " + f.get("email"))}`;
      return setStatus("mailto");
    }
    setStatus("sending");
    try {
      const r = await fetch(ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: f });
      if (!r.ok) throw new Error();
      form.reset(); setStatus("sent");
    } catch { setStatus("error"); }
  };
  return (
    <>
      <PageHead title="Contact">Open to internships and security-focused projects.</PageHead>
      <div className="two">
        <section className="panel">
          <h2>Send a message</h2>
          <form onSubmit={submit} className="form">
            <input name="name" placeholder="Your name" aria-label="Your name" required />
            <input name="email" type="email" placeholder="Your email" aria-label="Your email" required />
            <input name="_gotcha" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
            <textarea name="msg" rows="5" placeholder="Your message" aria-label="Your message" required />
            <button className="btn" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send message"}</button>
            <small role="status">{{ sent: "Thanks! Your message was sent.", error: "Could not send. Please email me directly.", mailto: "Your email app has opened with the message." }[status]}</small>
          </form>
        </section>
        <section className="panel">
          <h2>Direct contact</h2>
          <dl className="contact-list">
            <div><dt>Email</dt><dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd></div>
            <div><dt>Phone</dt><dd><a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></dd></div>
            <div><dt>Location</dt><dd>{profile.location}</dd></div>
          </dl>
          <div className="actions">
            <a className="btn ghost" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </section>
      </div>
    </>
  );
}
export function Resume() {
  const [hasPdf, setHasPdf] = useState(false);
  useEffect(() => {
    fetch(BASE + "Lathika-R-Resume.pdf", { method: "HEAD" })
      .then((r) => setHasPdf(r.ok && !(r.headers.get("content-type") || "").includes("html")))
      .catch(() => {});
  }, []);
  return (
    <section className="panel resume">
      <div className="actions no-print" style={{ marginTop: 0, marginBottom: 12 }}>
        {hasPdf && <a className="btn" href={BASE + "Lathika-R-Resume.pdf"} download>Download PDF</a>}
        <button className={"btn" + (hasPdf ? " ghost" : "")} onClick={() => window.print()}>Print / Save as PDF</button>
      </div>
      <h2>{profile.name}</h2>
      <p>{profile.role} | {profile.location} | {profile.phone} | {profile.email}<br />{profile.github} | {profile.linkedin}</p>
      <h3>Career objective</h3><p>{profile.goals[0]} {profile.goals[1]}</p>
      <h3>Education</h3>
      {education.map((e) => <p key={e.level}><b>{e.level}</b>, {e.place} {e.score && "(" + e.score + ")"}</p>)}
      <h3>Skills</h3>
      {skills.map((g) => <p key={g.group}><b>{g.group}:</b> {g.items.map((i) => i[0]).join(", ")}</p>)}
      <h3>Projects</h3>
      {projects.map((x) => <p key={x.title}><b>{x.title}</b> ({x.tags.join(", ")}): {x.desc}</p>)}
      <h3>Certifications</h3>
      <ul>{certs.map((c) => <li key={c.file}>{c.title}, {c.issuer}</li>)}</ul>
      <h3>Interests</h3><p>{profile.interests.join(", ")}</p>
    </section>
  );
}
