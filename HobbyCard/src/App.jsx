
import "./App.css";
import HobbyCard from "./HobbyCard.jsx";

import Reading from "./assets/reading.jpg";
import Painting from "./assets/painting.jpg";
import Music from "./assets/music.jpg";
import Photography from "./assets/photography.jpg";
import Gardening from "./assets/gardening.jpg";
import Cooking from "./assets/cooking.jpg";

function App() {
  const hobbies = [
    {
      hobbyName: "Reading",
      description: "Reading books improves knowledge and vocabulary.",
      image: Reading
    },
    {
      hobbyName: "Painting",
      description: "Painting allows creativity through colors and art.",
      image: Painting
    },
    {
      hobbyName: "Music",
      description: "Listening to music helps us relax and enjoy.",
      image: Music
    },
    {
      hobbyName: "Photography",
      description: "Photography captures beautiful memories forever.",
      image: Photography
    },
    {
      hobbyName: "Gardening",
      description: "Gardening keeps the environment green and healthy.",
      image: Gardening
    },
    {
      hobbyName: "Cooking",
      description: "Cooking is a useful skill that creates delicious food.",
      image: Cooking
    }
  ];

  return (
    <main className="project-page">
      <header className="page-header">
        <h1>My Hobbies</h1>
        <p>Explore the activities I enjoy in my free time.</p>
      </header>

      <section className="hobby-output">
        <div className="hobby-grid">
          {hobbies.map((hobby) => (
            <HobbyCard
              key={hobby.hobbyName}
              hobbyName={hobby.hobbyName}
              description={hobby.description}
              image={hobby.image}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
