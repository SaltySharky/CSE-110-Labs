import './App.css';
import { useState, useEffect } from 'react'; // Import useState and useEffect
import { Label, Note } from "./types"; // Import the Label type
import { dummyNotesList } from "./constants";
import { ClickCounter } from "./hooksExercise";

function App() {
    const [favoriteNotes, setFavoriteNotes] = useState<string[]>([]); // state for favorite notes

    // Toggle favorite
    const handleFavorite = (title: string) => {
        setFavoriteNotes((prevFavorites) => {
            if (prevFavorites.includes(title)) {
                return prevFavorites.filter((favTitle) => favTitle !== title); // Remove from favorites
            } else {
                return [...prevFavorites, title]; // Add to favorites
            }
        });
    };

    // Optional: useEffect to observe changes in favoriteNotes
    useEffect(() => {
        console.log("Favorite notes updated:", favoriteNotes);
    }, [favoriteNotes]);

  return (
      <div className='app-container'>
          <form className="note-form">
              <div><input placeholder="Note Title"></input></div>

              <div><textarea></textarea></div>

              <div>
                  <button type="submit">Create Note</button>
              </div>
          </form>

          <div className="notes-grid">
              {dummyNotesList.map((note) => (
                  <div key={note.id} className="note-item">
                      <div className="notes-header">
                          <button onClick={() => handleFavorite(note.title)}>
                              {favoriteNotes.includes(note.title) ? "Unlike" : "Like"}
                          </button>
                      </div>
                      <h2>{note.title}</h2>
                      <p>{note.content}</p>
                      <p>{note.label}</p>
                  </div>
              ))}
          </div>

          <div className="favorite-notes">
              <h3>Favorite Notes:</h3>
              <ul>
                  {favoriteNotes.map((favTitle, index) => (
                      <li key={index}>{favTitle}</li>
                  ))}
              </ul>
          </div>

          <ClickCounter/>
      </div>

  );
}

export default App;