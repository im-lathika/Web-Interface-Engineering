export const student = {
  college: "Prince Dr. K. Vasudevan College of Engineering and Technology",
  name: "Lathika R",
  regNo: "411625149025",
  department: "CSE – Cyber Security",
  batch: "2025–2029",
  currentSemester: "III",
};

// Grade → grade point
export const GRADE_POINTS = { S: 10, "A+": 9, A: 8, "B+": 7, B: 6, "C+": 5, C: 4 };
export const GRADE_SCALE = Object.entries(GRADE_POINTS);

// subjects: [code, name, credits, grade]
// attendance: [month, working days (D), absent (A), present (P)]
// A semester with an empty `subjects` list is treated as "in progress".
export const semesters = {
  1: {
    exam: "November/December 2025",
    subjects: [
      ["24TA101", "Heritage of Tamils", 1, "A"],
      ["24BS151", "Physics and Chemistry Laboratory", 2, "S"],
      ["24CH101", "Engineering Chemistry", 3, "C+"],
      ["24PH101", "Engineering Physics", 3, "B+"],
      ["24AC101", "Indian Constitution and Freedom Movement", 0, "S"],
      ["24EN101", "Technical English - I", 3, "A"],
      ["24MA102", "Matrices and Differential Equations", 4, "B+"],
      ["24CS192", "Design for Developers", 4, "A"],
      ["24CS193", "Logic Building using Java", 4, "A+"],
    ],
    attendance: [
      ["AUG", 5, 0, 5],
      ["SEP", 24, 1, 23],
      ["OCT", 20, 2, 18],
      ["NOV", 22, 1, 21],
    ],
  },
  2: {
    exam: "April/May 2026",
    subjects: [
      ["24EN291", "Technical English - II", 3, "A+"],
      ["24TA201", "Tamils and Technology", 1, "B+"],
      ["24MA292", "Probability Distributions and Statistics", 4, "A"],
      ["24EE293", "Basics of Electrical and Electronics for Computer Engineers", 3, "A"],
      ["24CS292", "Web Technology", 4, "A"],
      ["24CS293", "Problem Solving using Python for Computer Engineers", 4, "A"],
      ["24CS294", "Object Oriented Programming using Java", 4, "B+"],
    ],
    attendance: [
      ["JAN", 18, 2.5, 15.5],
      ["FEB", 23, 2, 21],
      ["MAR", 21, 7, 14],
      ["APR", 15, 2.5, 12.5],
    ],
  },
  3: {
    exam: null,
    subjects: [],
    attendance: [
      ["JUL", 25, 1, 24],
      ["AUG", 23, 2.5, 20.5],
      ["SEP", 23, 3, 20],
      ["OCT", 8, 0, 8],
    ],
  },
};

export function getSemester(n) {
  const sem = semesters[n];
  if (!sem) return null;

  const rows = sem.subjects.map(([code, name, credits, grade]) => {
    const gp = GRADE_POINTS[grade] ?? 0;
    return { code, name, credits, grade, gp, result: gp > 0 ? "PASS" : "ARREAR" };
  });

  const credits = rows.reduce((s, r) => s + r.credits, 0);
  const points = rows.reduce((s, r) => s + r.credits * r.gp, 0);
  const earned = rows.filter((r) => r.gp > 0).reduce((s, r) => s + r.credits, 0);

  const d = sem.attendance.reduce((s, m) => s + m[1], 0);
  const a = sem.attendance.reduce((s, m) => s + m[2], 0);
  const p = sem.attendance.reduce((s, m) => s + m[3], 0);

  return {
    n,
    exam: sem.exam,
    ongoing: rows.length === 0,
    rows,
    credits,
    earned,
    points,
    sgpa: credits ? points / credits : null,
    arrears: rows.filter((r) => r.gp === 0).length,
    attendance: { months: sem.attendance, d, a, p, pct: d ? (p / d) * 100 : 0 },
  };
}

export function getOverall() {
  const all = Object.keys(semesters).map((n) => getSemester(Number(n)));
  const done = all.filter((s) => !s.ongoing);
  const credits = done.reduce((s, x) => s + x.credits, 0);
  const points = done.reduce((s, x) => s + x.points, 0);
  const d = all.reduce((s, x) => s + x.attendance.d, 0);
  const p = all.reduce((s, x) => s + x.attendance.p, 0);
  return {
    all,
    done,
    credits,
    points,
    earned: done.reduce((s, x) => s + x.earned, 0),
    cgpa: credits ? points / credits : 0,
    arrears: done.reduce((s, x) => s + x.arrears, 0),
    attendance: d ? (p / d) * 100 : 0,
  };
}