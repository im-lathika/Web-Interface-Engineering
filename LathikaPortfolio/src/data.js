export const profile = {
  name: "Lathika R",
  role: "CSE (Cyber Security) Student",
  department: "Computer Science and Engineering (Cyber Security)",
  college: "Prince Dr. K. Vasudevan College of Engineering and Technology, Chennai",
  location: "Chennai, Tamil Nadu",
  email: "lathika967@gmail.com",
  phone: "+91 89257 42624",
  linkedin: "https://www.linkedin.com/in/lathika-r-9a8b70385",
  github: "https://github.com/im-lathika",
  cgpa: "7.9",
  degree: "B.E. Computer Science and Engineering (Cyber Security)",
  school: "Shri Venkateshwara Higher Secondary School",
  summary:
    "Cyber Security student (CGPA 7.9) who builds with Java, JavaScript and React, and is learning to build with AI tools such as Claude, MCP and agent skills.",
  goals: [
    "Build a career as a Security Analyst or Security Engineer, protecting applications and data from real-world threats.",
    "Combine secure coding with full-stack web development to create software that is safe by design.",
    "Apply AI tools responsibly to speed up threat analysis, testing and automation.",
    "Keep growing through certifications, hackathons and open-source contributions.",
  ],
  interests: ["Reading books", "Arduino automation", "Web development", "Learning AI tools"],
};
export const categories = ["AI & Anthropic", "Web & Programming", "Cloud & Microsoft", "Skills & Workshops"];
export const skills = [
  { group: "Programming", items: [["Python", 65], ["Data structures", 60], ["Java", 75], ["Object-oriented programming", 70], ["File handling", 70], ["JavaScript", 65]] },
  { group: "Web", items: [["HTML", 85], ["CSS", 80], ["Responsive web design", 80], ["React", 60]] },
  { group: "Cloud & Apps", items: [["Azure Files and Blob Storage", 55], ["Power Apps", 50]] },
  { group: "AI", items: [["Claude Code", 60], ["Anthropic API", 50], ["Model Context Protocol", 50], ["Agent skills", 55], ["Subagents", 50], ["Claude on Bedrock / Vertex AI", 45]] },
  { group: "Security & Tools", items: [["Cyber security fundamentals", 60], ["Git and GitHub", 70], ["VS Code", 80], ["Canva", 70]] },
  { group: "Other", items: [["Arduino automation", 55], ["UX basics", 60], ["Communication", 75]] },
];
const gh = (n) => "https://github.com/im-lathika/" + n;
export const projects = [
  { title: "Student Portfolio", desc: "Personal portfolio website showcasing skills, projects, education and contact details.", tags: ["HTML", "CSS", "JavaScript"], link: gh("Student-Portfolio") },
  { title: "College Management System", desc: "Modern responsive college website for Pondicherry Institute of Technology & Science with admissions, courses, facilities, gallery and contact pages.", tags: ["HTML", "CSS", "Responsive"], link: gh("College-Management-System") },
  { title: "Restaurant Online Order Website", desc: "Front-end restaurant website where customers browse the menu and place online orders.", tags: ["HTML", "CSS", "JavaScript"], link: gh("Restaurant-Online-Order-Website") },
  { title: "Web Technology", desc: "Front-end projects on responsive interfaces and interactive web applications.", tags: ["HTML", "CSS", "JavaScript"], link: gh("Web-Technology") },
  { title: "Object-Oriented Programming", desc: "OOP implementations demonstrating software design principles and problem solving.", tags: ["OOP", "Java"], link: gh("OOPS") },
  { title: "Python Practice", desc: "Python scripts and applications covering algorithms, data structures and application development.", tags: ["Python", "Algorithms"], link: gh("Python") },
  { title: "Student Report Card Management System", desc: "Java application that manages student report cards using file handling and OOP. Completed through Great Learning (Dec 2025).", tags: ["Java", "OOP", "File handling"], link: "", shot: "", demo: "" },
];
export const education = [
  { level: "B.E. CSE (Cyber Security)", place: "Prince Dr. K. Vasudevan College of Engineering and Technology, Chennai", score: "CGPA 7.9" },
  { level: "Higher Secondary (12th) and Secondary (10th)", place: "Shri Venkateshwara Higher Secondary School", score: "" },
];
export const timeline = [
  { sem: "Semester 1", note: "Foundations: digital skills, Java, JavaScript, cloud basics and industry programs.", focus: "Accenture, Great Learning, TCS iON, LEAP, Microsoft" },
  { sem: "Semester 2", note: "Specialisation: responsive web design, Java fundamentals and AI development with Anthropic.", focus: "Anthropic, Java, Web design" },
];
// file = name inside public/certs/ (put your JPEGs there). Missing files show a placeholder.
export const certs = [
  { file: "digital-skill.jpg", title: "Digital Skills", issuer: "Accenture", sem: 1, cat: "Skills & Workshops", date: "Sem 1" },
  { file: "great-learning.jpg", title: "Student Report Card System in Java", issuer: "Great Learning", sem: 1, cat: "Web & Programming", date: "Dec 2025" },
  { file: "java.jpg", title: "Java Certificate of Excellence", issuer: "Java Course", sem: 1, cat: "Web & Programming", date: "Sem 1" },
  { file: "javascript.jpg", title: "JavaScript Certificate of Excellence", issuer: "JavaScript Course", sem: 1, cat: "Web & Programming", date: "Sem 1" },
  { file: "leap.jpg", title: "LEAP: Automation with Arduino", issuer: "LEAP, PKVCET", sem: 1, cat: "Skills & Workshops", date: "Aug 2025" },
  { file: "azure-files.jpg", title: "Azure Files and Blob Storage", issuer: "Microsoft", sem: 1, cat: "Cloud & Microsoft", date: "Sem 1" },
  { file: "microsoft-canva.jpg", title: "Microsoft Power Apps", issuer: "Microsoft", sem: 1, cat: "Cloud & Microsoft", date: "Sem 1" },
  { file: "tcs-ion.jpg", title: "Communication Skills", issuer: "TCS iON", sem: 1, cat: "Skills & Workshops", date: "Sem 1" },
  { file: "java-fundamentals.jpg", title: "Java Fundamentals", issuer: "Online course", sem: 2, cat: "Web & Programming", date: "06 Jun 2026" },
  { file: "legacy-responsive-web-design.jpg", title: "Legacy Responsive Web Design", issuer: "Online course", sem: 2, cat: "Web & Programming", date: "31 Mar 2026" },
  { file: "responsive-web-design.jpg", title: "Responsive Web Design", issuer: "Online course", sem: 2, cat: "Web & Programming", date: "15 Apr 2026" },
  { file: "anthropic-1.jpg", title: "Claude Code in Action", issuer: "Anthropic", sem: 2, cat: "AI & Anthropic", date: "19 Mar 2026" },
  { file: "anthropic-2.jpg", title: "Claude 101", issuer: "Anthropic", sem: 2, cat: "AI & Anthropic", date: "Sem 2" },
  { file: "anthropic-3.jpg", title: "AI Fluency: Framework & Foundations", issuer: "Anthropic", sem: 2, cat: "AI & Anthropic", date: "Sem 2" },
  { file: "anthropic-4.jpg", title: "Claude with the Anthropic API", issuer: "Anthropic", sem: 2, cat: "AI & Anthropic", date: "20 Mar 2026" },
  { file: "anthropic-5.jpg", title: "Introduction to Model Context Protocol", issuer: "Anthropic", sem: 2, cat: "AI & Anthropic", date: "20 Mar 2026" },
  { file: "anthropic-6.jpg", title: "AI Fluency for Educators", issuer: "Anthropic", sem: 2, cat: "AI & Anthropic", date: "Sem 2" },
  { file: "anthropic-7.jpg", title: "AI Fluency for Students", issuer: "Anthropic", sem: 2, cat: "AI & Anthropic", date: "Sem 2" },
  { file: "anthropic-8.jpg", title: "Model Context Protocol: Advanced Topics", issuer: "Anthropic", sem: 2, cat: "AI & Anthropic", date: "20 Mar 2026" },
  { file: "anthropic-9.jpg", title: "Claude with Amazon Bedrock", issuer: "Anthropic", sem: 2, cat: "AI & Anthropic", date: "20 Mar 2026" },
  { file: "anthropic-10.jpg", title: "Claude with Google Vertex AI", issuer: "Anthropic", sem: 2, cat: "AI & Anthropic", date: "20 Mar 2026" },
  { file: "anthropic-11.jpg", title: "Teaching the AI Fluency Framework", issuer: "Anthropic", sem: 2, cat: "AI & Anthropic", date: "Sem 2" },
  { file: "anthropic-12.jpg", title: "AI Fluency for Nonprofits", issuer: "Anthropic", sem: 2, cat: "AI & Anthropic", date: "Sem 2" },
  { file: "anthropic-13.jpg", title: "Introduction to Agent Skills", issuer: "Anthropic", sem: 2, cat: "AI & Anthropic", date: "Sem 2" },
  { file: "anthropic-14.jpg", title: "Introduction to Subagents", issuer: "Anthropic", sem: 2, cat: "AI & Anthropic", date: "Sem 2" },
  { file: "anthropic-15.jpg", title: "Introduction to Claude Cowork", issuer: "Anthropic", sem: 2, cat: "AI & Anthropic", date: "Sem 2" },
];

export const ANTHROPIC_TOTAL = 15; // courses in the Anthropic Academy set
