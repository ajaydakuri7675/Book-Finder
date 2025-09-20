// src/BookModal.jsx
import { useEffect, useState } from "react";
import { fetchWorkDetails } from "../api";
import { coverUrlFromDoc } from "../utils";

export default function BookModal({ doc, onClose }) {
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!doc) return;
      setLoading(true);
      try {
        if (doc.key && doc.key.startsWith("/works/")) {
          const details = await fetchWorkDetails(doc.key);
          if (mounted) setWork(details);
        }
      } catch (e) {
        console.error("Error loading work details:", e);
      }
      setLoading(false);
    }
    load();
    return () => {
      mounted = false;
    };
  }, [doc]);

  if (!doc) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white max-w-2xl w-full rounded-lg p-6 shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <img
              src={coverUrlFromDoc(doc, "L")}
              alt={doc.title}
              className="w-28 h-40 object-cover rounded"
            />
            <div>
              <h2 className="text-xl font-bold">{doc.title}</h2>
              <p className="text-sm text-gray-600">
                {doc.author_name?.join(", ")}
              </p>
              <p className="text-xs text-gray-500">
                First published: {doc.first_publish_year || "—"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="mt-4">
          {loading && <div className="loader mx-auto"></div>}

          {!loading && (
            <>
              <p className="text-sm text-gray-700">
                {work?.description?.value ??
                  work?.description ??
                  doc.subtitle ??
                  "No description available."}
              </p>

              {work?.subjects && (
                <div className="mt-3">
                  <h4 className="text-sm font-semibold">Subjects</h4>
                  <div className="flex gap-2 flex-wrap mt-1">
                    {work.subjects.slice(0, 8).map((subject, i) => (
                      <span
                        key={i}
                        className="bg-gray-200 text-xs px-2 py-1 rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
