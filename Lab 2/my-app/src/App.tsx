import './App.css';
import { useState, useEffect } from 'react'; // Import useState and useEffect
import { Label, Note } from "./types"; // Import the Label type
import { dummyNotesList } from "./constants";
import { ClickCounter } from "./hooksExercise";

function App() {
    const [notesList, setNotesList] = useState(dummyNotesList); // initialize the notesList from the dummyNotesList
    const [newNote, setNewNote] = useState({ title: '', content: '', label: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editNoteId, setEditNoteId] = useState<number | null>(null);
    const [favoriteNotes, setFavoriteNotes] = useState<string[]>([]); // state for favorite notes
    const [darkMode, setDarkMode] = useState(false);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setNewNote({
            ...newNote,
            [e.target.name]: e.target.value,
        });
    };

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

    // Create or Update Note
    const handleCreateNote = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && editNoteId !== null) {
            // Find the old note title before updating
            const oldTitle = notesList.find((note) => note.id === editNoteId)?.title;

            // Update existing note
            setNotesList((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === editNoteId
                        ? { ...note, ...newNote } // Update the note with new values
                        : note
                )
            );

            // If the title was updated and it's in the favorites list, update the favorite notes list
            if (oldTitle && oldTitle !== newNote.title && favoriteNotes.includes(oldTitle)) {
                setFavoriteNotes((prevFavorites) =>
                    prevFavorites.map((favTitle) =>
                        favTitle === oldTitle ? newNote.title : favTitle
                    )
                );
            }

            setIsEditing(false); // Reset editing state
            setEditNoteId(null); // Clear edit note ID
        } else {
            // Create new note
            const newNoteEntry = {
                id: Date.now(), // Unique ID using timestamp
                ...newNote,
            };
            setNotesList([...notesList, newNoteEntry]);
        }

        setNewNote({ title: '', content: '', label: Label.school }); // Reset form, default label to 'school'
    };

    // Delete a note
    const handleDeleteNote = (id: number) => {
        const deletedNoteTitle = notesList.find((note) => note.id === id)?.title;
        setNotesList(notesList.filter((note) => note.id !== id));

        // Remove the note from the favorites if it exists
        if (deletedNoteTitle && favoriteNotes.includes(deletedNoteTitle)) {
            setFavoriteNotes((prevFavorites) =>
                prevFavorites.filter((favTitle) => favTitle !== deletedNoteTitle)
            );
        }
    };

    // Edit a note
    const handleEditNote = (id: number) => {
        const noteToEdit = notesList.find((note) => note.id === id);
        if (noteToEdit) {
            setNewNote(noteToEdit); // Populate the form with note data
            setIsEditing(true);
            setEditNoteId(id); // Track the note ID for editing
        }
    };

    // Toggle light or dark theme
    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
    };

    return (
        <div className="app-container">
            <form className="note-form" onSubmit={handleCreateNote}>
                <div>
                    <input
                        name="title"
                        placeholder="Note Title"
                        value={newNote.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
          <textarea
              name="content"
              placeholder="Note Content"
              value={newNote.content}
              onChange={handleInputChange}
          />
                </div>
                <div>
                    <select
                        name="label"
                        value={newNote.label}
                        onChange={handleInputChange}
                    >
                        {Object.values(Label).map((labelOption, index) => (
                            <option key={index} value={labelOption}>
                                {labelOption}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button type="submit">
                        {isEditing ? 'Update Note' : 'Create Note'}
                    </button>
                </div>
            </form>

            <div className="notes-grid">
                {notesList.map((note) => (
                    <div key={note.id} className="note-item">
                        <div className="notes-header">
                            <button onClick={() => handleDeleteNote(note.id)}>delete</button>
                            <button onClick={() => handleEditNote(note.id)}>edit</button>
                            <button onClick={() => handleFavorite(note.title)}>
                                {favoriteNotes.includes(note.title) ? 'unlike' : 'like'}
                            </button>
                        </div>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                        <p className={`label-box label-${note.label}`}>{note.label}</p> {/* Label in a colored box */}
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

            <div className="theme-toggle">
                <button onClick={toggleTheme}>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
        </div>
    );
}

export default App;