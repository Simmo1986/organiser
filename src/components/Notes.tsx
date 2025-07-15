import { useEffect, useState } from "react";

export default function Notes() {
  // State for the note content
  const [note, setNote] = useState<string>("");

  // State for an optional note title
  const [title, setTitle] = useState<string>("");

  // When the component loads (mounts), get any saved note and title from localStorage
  useEffect(() => {
    const savedNote = localStorage.getItem("note");
    const savedTitle = localStorage.getItem("note-title");

    if (savedNote) setNote(savedNote); // Set the saved note if it exists
    if (savedTitle) setTitle(savedTitle); // Set the saved title if it exists
  }, []);

  // Whenever the note or title changes, update localStorage to save them
  useEffect(() => {
    localStorage.setItem("note", note); // Save note text
    localStorage.setItem("note-title", title); // Save title text
  }, [note, title]); // This effect runs anytime `note` or `title` changes

  // Clear both the note and title when the user confirms
  function handleClear() {
    if (confirm("Clear all notes?")) {
      setNote(""); // Clear the note state
      setTitle(""); // Clear the title state
      localStorage.removeItem("note"); // Remove saved note from localStorage
      localStorage.removeItem("note-title"); // Remove saved title from localStorage
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Heading with emoji and title */}
      <h1 className="flex items-center justify-center gap-2 text-2xl font-bold mb-6 text-gray-800">
        <span role="img" aria-label="Notebook">🗒️</span>
        Notes
      </h1>

      {/* Input field for the note title */}
      <input
        type="text"
        value={title} // Controlled input
        onChange={(e) => setTitle(e.target.value)} // Update title state
        placeholder="Note title..."
        className="w-full mb-3 border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Textarea for the actual note content */}
      <textarea
        value={note} // Controlled textarea
        onChange={(e) => setNote(e.target.value)} // Update note state
        placeholder="Write notes about your tasks here..."
        className="w-full h-64 p-4 border border-gray-300 rounded-lg shadow resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800"
      />

      {/* Bottom bar with character count and clear button */}
      <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
        <span>{note.length} characters</span> {/* Live character count */}
        <button
          onClick={handleClear}
          className="text-red-500 hover:underline"
        >
          Clear note
        </button>
      </div>
    </div>
  );
}
