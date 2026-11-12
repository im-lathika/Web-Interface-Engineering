
import "./HobbyCard.css";

function HobbyCard({ hobbyName, description, image }) {
  return (
    <article className="hobby-card">
      <div className="hobby-image-wrap">
        <img
          src={image}
          alt={hobbyName}
          className="hobby-image"
        />
      </div>

      <div className="hobby-details">
        <h2>{hobbyName}</h2>
        <p>{description}</p>
      </div>
    </article>
  );
}

export default HobbyCard;
