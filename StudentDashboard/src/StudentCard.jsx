import React from "react";
import "./StudentCard.css";

function StudentCard({
  photo,
  name,
  regNo,
  dept,
  year,
  sem,
  cgpa,
  attendance,
}) {
  return (
    <section className="student-card">

      <div className="photo-section">

        <img
          className="student-photo"
          src={photo}
          alt={`${name} photo`}
        />

        <h2 className="student-name">
          {name}
        </h2>

      </div>

      <div className="student-info">

        <h3 className="card-heading">
          Student Details
        </h3>

        <table className="student-table">
          <tbody>

            <tr>
              <td className="label">Register No</td>
              <td>{regNo}</td>
            </tr>

            <tr>
              <td className="label">Department</td>
              <td>{dept}</td>
            </tr>

            <tr>
              <td className="label">Year & Semester</td>
              <td>
                {year} Year, {sem} Semester
              </td>
            </tr>

            <tr>
              <td className="label">CGPA</td>
              <td>
                <span className="cgpa-value">
                  {cgpa}
                </span>
              </td>
            </tr>

            <tr>
              <td className="label">Attendance</td>
              <td>
                <span className="attendance-value">
                  {attendance}%
                </span>
              </td>
            </tr>

          </tbody>
        </table>

      </div>

    </section>
  );
}

export default StudentCard;