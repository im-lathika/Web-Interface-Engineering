export const ROMAN = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8 };

export const attendanceTone = (p) => (p >= 85 ? "ok" : p >= 75 ? "warn" : "bad");

export const gradeTone = (g) =>
  ({ S: "ok", "A+": "ok", A: "info", "B+": "info", B: "warn", "C+": "warn", C: "warn" })[g] ?? "bad";