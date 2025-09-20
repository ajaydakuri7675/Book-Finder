// src/App.jsx
import { useState } from "react";
import { fetchBooksByTitle } from "./api";
import BookModal from "./components/BookModal";
import { coverUrlFromDoc } from "./utils";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await fetchBooksByTitle(query);
      setBooks(data.docs);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📚 Book Finder</h1>

      <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <div className="loader mx-auto mt-6"></div>}

      {!loading && books.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {books.map((book) => (
            <div
              key={book.key}
              className="bg-white p-3 rounded shadow hover:shadow-md transition cursor-pointer"
              onClick={() => setSelectedDoc(book)}
            >
              <img
                src={coverUrlFromDoc(book)}
                alt={book.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-sm font-semibold mt-2">{book.title}</h3>
              <p className="text-xs text-gray-500">
                {book.author_name?.slice(0, 2).join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedDoc && (
        <BookModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}
    </div>
  );
}
