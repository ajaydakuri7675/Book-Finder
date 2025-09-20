import React from 'react';


export default function Pagination({ page, setPage, numFound }) {
const totalPages = Math.ceil((numFound || 0) / 100); // OpenLibrary search returns 100 per page
return (
<div className="flex items-center justify-center gap-3 mt-6">
<button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
className="px-3 py-1 rounded border bg-white">Prev</button>
<div>Page {page} {totalPages ? `of ${totalPages}` : ''}</div>
<button onClick={() => setPage(p => Math.min(totalPages || 1, p + 1))} disabled={page >= totalPages}
className="px-3 py-1 rounded border bg-white">Next</button>
</div>
)
}