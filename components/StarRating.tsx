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
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => setRating(i)}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          className="text-3xl transition-colors leading-none"
        >
          <span className={(hover || rating) >= i ? 'text-yellow-400' : 'text-gray-600'}>★</span>
        </button>
      ))}
      <input type="hidden" name={name} value={rating} />
    </div>
  );
}
