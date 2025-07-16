import { useState, useEffect, ChangeEvent, FormEvent } from "react";

// Define note type
type Note = {
  id: string;
  content: string;
};

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [newNote, setNewNote] = useState("");

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add new note
  function handleAddNote(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newNote.trim()) return;

    setNotes((prev) => [
      ...prev,
      { id: crypto.randomUUID(), content: newNote.trim() },
    ]);
    setNewNote(""); // Clear textarea
  }

  // Update content of existing note
  function handleNoteChange(id: string, value: string) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, content: value } : note
      )
    );
  }

  // Delete a note
  function handleDelete(id: string) {
    if (confirm("Delete this note?")) {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">🗒️ Notes</h1>

      <form onSubmit={handleAddNote} className="mb-4">
        <textarea
          value={newNote}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setNewNote(e.target.value)
          }
          className="w-full p-4 border rounded resize-none px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a new note..."
        />
        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Note
        </button>
      </form>

      <div className="space-y-4">
        {notes.length === 0 && (
          <p className="text-center text-gray-500">No notes yet.</p>
        )}
        {notes.map((note) => (
          <div
            key={note.id}
            className="relative bg-white border border-gray-300 rounded-lg shadow"
          >
            <textarea
              value={note.content}
              onChange={(e) => handleNoteChange(note.id, e.target.value)}
              className="w-full p-4 resize-none focus:outline-none rounded-lg"
              rows={4}
            />
            <button
              onClick={() => handleDelete(note.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              aria-label="Delete note"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
