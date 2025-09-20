import { useState } from "react";
import { searchBooks } from "../api";
import BookList from "./BookList";

export default function SearchBar({ onSelectBook }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const results = await searchBooks(query);
      setBooks(results);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
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

      {loading && (
        <div className="flex justify-center">
          <div className="loader"></div>
        </div>
      )}

      {!loading && books.length > 0 && (
        <BookList books={books} onSelectBook={onSelectBook} />
      )}
    </div>
  );
}
