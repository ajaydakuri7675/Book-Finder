import React from 'react';
import { coverUrlFromDoc } from '../utils';


export default function BookCard({ doc, onOpen, isFav, toggleFav }) {
const title = doc.title || 'Untitled';
const authors = doc.author_name ? doc.author_name.join(', ') : 'Unknown';
const year = doc.first_publish_year || doc.publish_year?.[0] || '—';
const cover = coverUrlFromDoc(doc, 'M');


return (
<div className="bg-white shadow-sm rounded-lg overflow-hidden flex flex-col">
<img src={cover} alt={title} className="h-48 w-full object-cover" />
<div className="p-3 flex-1 flex flex-col">
<h3 className="font-semibold text-sm mb-1">{title}</h3>
<p className="text-xs text-gray-600 truncate">{authors}</p>
<div className="mt-auto flex items-center justify-between">
<button onClick={() => onOpen(doc)} className="text-xs text-indigo-600">Details</button>
<div className="flex items-center gap-2">
<span className="text-xs text-gray-500">{year}</span>
<button
aria-pressed={isFav}
onClick={() => toggleFav(doc)}
className={`px-2 py-1 rounded ${isFav ? 'bg-pink-100 text-pink-600' : 'bg-gray-100'}`}
>{isFav ? '♥' : '♡'}</button>
</div>
</div>
</div>
</div>
)
}