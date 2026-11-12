import React from "react";
import Header1 from "./Header";
import StudentCard from "./StudentCard";
import SubjectList from "./SubjectList";
import Footer1 from "./Footer";
import Student from "./assets/student.jpg";
import "./App.css";

function App() {
  const collegeName =
    "Prince Dr. K. Vasudevan College of Engineering and Technology";

  const studentData = {
    photo: Student,
    name: "Lathika",
    regNo: "411625149025",
    dept: "CSE (Cyber Security)",
    year: "1st",
    sem: "2nd",
    cgpa: 8.2,
    attendance: 95,
  };

  const subjects = [
    "Discrete Mathematics",
    "Object Oriented Programming",
    "Digital Principles and Computer Organization",
    "Physics for Information Science",
    "Environmental Sciences and Sustainability",
    "Introduction to Cyber Security",
  ];

  return (
    <div className="app">

      <Header1 collegeName={collegeName} />

      <main className="main-content">

        <StudentCard
          photo={studentData.photo}
          name={studentData.name}
          regNo={studentData.regNo}
          dept={studentData.dept}
          year={studentData.year}
          sem={studentData.sem}
          cgpa={studentData.cgpa}
          attendance={studentData.attendance}
        />

        <SubjectList
          subjects={subjects}
          currentYear={studentData.year}
          currentSem={studentData.sem}
          attendance={studentData.attendance}
        />

      </main>

      <Footer1 collegeName={collegeName} />

    </div>
  );
}

export default App;