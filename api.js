// src/api.js

export async function fetchBooksByTitle(title) {
    const res = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
    );
    if (!res.ok) throw new Error("Failed to fetch books");
    return res.json();
  }
  
  export async function fetchWorkDetails(workKey) {
    // workKey will be like "/works/OL8008880W"
    const res = await fetch(`https://openlibrary.org${workKey}.json`);
    if (!res.ok) throw new Error("Failed to fetch work details");
    return res.json();
  }
  