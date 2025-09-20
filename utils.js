// src/utils.js

export function coverUrlFromDoc(doc, size = "M") {
    if (!doc.cover_i) return "https://via.placeholder.com/150x200?text=No+Cover";
    return `https://covers.openlibrary.org/b/id/${doc.cover_i}-${size}.jpg`;
  }
  