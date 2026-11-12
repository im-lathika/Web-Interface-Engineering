import React from "react";
import "./SubjectList.css";

function SubjectList({
  subjects,
  currentYear,
  currentSem,
  attendance,
}) {
  const totalSubjects = subjects.length;

  const attendanceEligible = attendance >= 80;

  const attendanceStatus = attendanceEligible
    ? "Eligible"
    : "Not Eligible";

  const placementStatus = attendanceEligible
    ? "Eligible"
    : "Needs Improvement";

  return (
    <section className="subject-list-card">

      <div className="subject-header-row">

        <div>
          <h2 className="subject-title">
            Current Semester Subjects
          </h2>

          <p className="subject-subtitle">
            Subjects enrolled for the current semester
          </p>
        </div>

        <span className="total-badge">
          {totalSubjects} Subjects
        </span>

      </div>

      <ul className="subject-list">

        {subjects.map((subject, index) => (
          <li
            className="subject-item"
            key={index}
          >

            <span className="subject-index">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="subject-name">
              {subject}
            </span>

          </li>
        ))}

      </ul>

      <div className="info-strip">

        <div className="info-chip">
          <span className="info-label">
            Current Year
          </span>

          <span className="info-value">
            {currentYear} Year
          </span>
        </div>

        <div className="info-chip">
          <span className="info-label">
            Current Semester
          </span>

          <span className="info-value">
            {currentSem} Semester
          </span>
        </div>

        <div className="info-chip">
          <span className="info-label">
            Total Subjects
          </span>

          <span className="info-value">
            {totalSubjects}
          </span>
        </div>

        <div className="info-chip">
          <span className="info-label">
            Attendance Status
          </span>

          <span
            className={`pill ${
              attendanceEligible
                ? "pill-good"
                : "pill-bad"
            }`}
          >
            {attendanceStatus}
          </span>
        </div>

        <div className="info-chip">
          <span className="info-label">
            Placement Status
          </span>

          <span
            className={`pill ${
              attendanceEligible
                ? "pill-good"
                : "pill-bad"
            }`}
          >
            {placementStatus}
          </span>
        </div>

      </div>

    </section>
  );
}

export default SubjectList;