import { coverUrlFromDoc } from "../utils";

export default function BookList({ books, onSelectBook }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {books.map((book) => (
        <div
          key={book.key}
          onClick={() => onSelectBook(book)}
          className="bg-white rounded shadow hover:shadow-md p-2 cursor-pointer transition"
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
  );
}
