import { GRADE_SCALE } from "../data";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grades">
        {GRADE_SCALE.map(([grade, point]) => (
          <span key={grade} className="footer__item">
            <b>{grade}</b> = {point}
          </span>
        ))}
      </div>
      <p>Grade point scale · SGPA / CGPA are credit-weighted</p>
    </footer>
  );
}

export default Footer;