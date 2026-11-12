import { useState } from "react";

import "./Attendance.css";

function Attendance() {

  const [students, setStudents] = useState([
    { id: 1, name: "Kowsalya", status: "Present" },
    { id: 2, name: "Devika", status: "Present" },
    { id: 3, name: "Srimathi", status: "Present" },
    { id: 4, name: "Hemamalini", status: "Present" },
    { id: 5, name: "Meenakshi", status: "Present" },
    { id: 6, name: "Gopika", status: "Present" },
    { id: 7, name: "Bhavani", status: "Present" },
    { id: 8, name: "Vanthana", status: "Absent" },
    { id: 9, name: "Dinesh", status: "Present" },
    { id: 10, name: "Pavi", status: "Present" },
    { id: 11, name: "Vanaja", status: "Absent" },
    { id: 12, name: "Shruthi", status: "Present" },
    { id: 13, name: "Janani", status: "Present" },
    { id: 14, name: "Suriya", status: "Present" },
    { id: 15, name: "Lathika", status: "Present" },
    { id: 16, name: "Keerthana", status: "Present" },
    { id: 17, name: "Thamilarasi", status: "Present" },
    { id: 18, name: "Devi", status: "Present" },
    { id: 19, name: "Vijay", status: "Present" },
    { id: 20, name: "Karthik", status: "Present" }
  ]);

  const changeAttendance = (id, value) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, status: value }
          : student
      )
    );
  };

  const presentCount = students.filter(
    (student) => student.status === "Present"
  ).length;

  const absentCount = students.filter(
    (student) => student.status === "Absent"
  ).length;

  const notMarkedCount = students.filter(
    (student) => student.status === ""
  ).length;

  return (
    <div className="page">
      <div className="attendance-box">
        <h1>Attendance Tracker System</h1>

        <div className="student-list">
          {students.map((student) => (
            <div className="student-row" key={student.id}>
              <div className="student-name">
                <span>{student.id}</span>
                <span>{student.name}</span>
              </div>

              <div className="actions">
                <button
                  className={
                    student.status === "Present"
                      ? "present active"
                      : "present"
                  }
                  onClick={() =>
                    changeAttendance(student.id, "Present")
                  }
                >
                  Present
                </button>

                <button
                  className={
                    student.status === "Absent"
                      ? "absent active"
                      : "absent"
                  }
                  onClick={() =>
                    changeAttendance(student.id, "Absent")
                  }
                >
                  Absent
                </button>
              </div>

              <div className="status">
                {student.status === ""
                  ? "Not Marked"
                  : student.status}
              </div>
            </div>
          ))}
        </div>

        <div className="counts">
          <div className="count-box">
            <h2>{presentCount}</h2>
            <p>Present</p>
          </div>

          <div className="count-box">
            <h2>{absentCount}</h2>
            <p>Absent</p>
          </div>

          <div className="count-box">
            <h2>{notMarkedCount}</h2>
            <p>Not Marked</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;