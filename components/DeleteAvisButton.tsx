'use client';

export default function DeleteAvisButton({ formAction }: { formAction: string }) {
  return (
    <form action={formAction} method="POST" className="w-full sm:w-auto">
      <button
        type="submit"
        className="w-full sm:w-auto text-sm text-red-400 border border-red-500/20 hover:border-red-400/50 px-4 py-2.5 sm:py-2 rounded-md transition-colors"
        onClick={(e) => {
          if (!confirm('Supprimer cet avis ?')) e.preventDefault();
        }}
      >
        Supprimer
      </button>
    </form>
  );
}
