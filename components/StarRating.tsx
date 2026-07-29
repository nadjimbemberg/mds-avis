'use client';
import { useState } from 'react';

export default function StarRating({
  name = 'rating',
  defaultValue = 0,
}: {
  name?: string;
  defaultValue?: number;
}) {
  const [rating, setRating] = useState(defaultValue);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center -ml-1.5" role="radiogroup" aria-label="Note sur 5 étoiles">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          role="radio"
          aria-checked={rating === i}
          aria-label={`${i} étoile${i > 1 ? 's' : ''}`}
          onClick={() => setRating(i)}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          className="text-3xl p-1.5 transition-colors leading-none"
        >
          <span className={(hover || rating) >= i ? 'text-yellow-400' : 'text-gray-600'}>★</span>
        </button>
      ))}
      <input type="hidden" name={name} value={rating} />
    </div>
  );
}
